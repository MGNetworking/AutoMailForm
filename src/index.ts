import express, { Request, Response } from "express";
import favicon from "serve-favicon";
import path from "path";
import { sendMail, sendUserEmail } from "./service/mailer";
import { EmailUtils } from "./utils/EmailUtils";
import { EmailLog } from "./model/mail";
import config from "./config";

// initialisation
const app = express();

(async () => {
  try {
    await EmailLog.initialize();
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
    process.exit(1); // Ferme l'application si l'initialisation échoue
  }
})();

// middlewares
app.use(favicon(path.join(__dirname + "/favicon.ico")), express.json());

app.post("/api/sendMail", async (req: Request, res: Response, next) => {
  const {
    name,
    email,
    sujetClient,
    messageUser,
    sujetReponse,
    texteReponse,
    testlenght,
  } = req.body;

  const validation = EmailUtils.checkData(req);
  if (!validation.valid) {
    res.status(400).json({ status: "error", message: validation.message });
    return;
  }

  // Exécute chaque envoi d'email en parallèle et capture chaque résultat
  const [infoAdmin, infoUser] = await Promise.allSettled([
    sendMail(messageUser, sujetClient, config.FROM, config.ADRESSE_SMTP),
    sendUserEmail(email, sujetReponse, texteReponse, config.FROM),
  ]);

  // Log et informations de la demande pour chaque envoi
  let responseDetails = [];

  try {
    // Enregistrement en base de données pour User avec un ternaire
    await EmailLog.logEmail(
      "Admin",
      infoAdmin,
      config.ADRESSE_SMTP,
      config.FROM,
      sujetClient,
      messageUser
    );

    responseDetails.push({
      provider: "User",
      status: infoAdmin.status === "fulfilled" ? "sent" : "failed",
      response:
        infoAdmin.status === "fulfilled" ? infoAdmin.value.response : undefined,
      error: infoAdmin.status === "fulfilled" ? undefined : infoAdmin.reason,
    });

    // Enregistrement en base de données pour User avec un ternaire
    await EmailLog.logEmail(
      "User",
      infoUser,
      email,
      config.FROM,
      sujetReponse,
      texteReponse
    );

    responseDetails.push({
      provider: "User",
      status: infoUser.status === "fulfilled" ? "sent" : "failed",
      response:
        infoUser.status === "fulfilled" ? infoUser.value.response : undefined,
      error: infoUser.status === "fulfilled" ? undefined : infoUser.reason,
    });

    // Réponse en cas de succès
    res.status(200).json({
      status: "success",
      message: "E-mail a était transmit au server SMTP",
      demande: sujetClient,
      data: responseDetails,
    });
    return;
  } catch (error) {
    next(error);
  }
});

// Middleware de gestion d'erreurs (doit être défini après toutes les routes)
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "error", message: "Une erreur interne est survenue." });
});

// Lancement de l'API
app.listen(config.PORT, () =>
  console.log(`API en cours d'exécution sur : http://localhost:${config.PORT}`)
);
