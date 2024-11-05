import express, { Request, Response } from "express";
import favicon from "serve-favicon";

const app = express();
const port = 3010;
console.log(__dirname);
// middlewares
app.use(favicon(__dirname + "/favicon.ico"));

// run API
app.listen(port, () =>
  console.log(`this API to run in basic IP: http://localhost:${port}`)
);

app.get("/api/hello", (req, res) => {
  res.json("hello world ;)");
});

app.post("/api/submit-form", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // TODO check des donnée du formulaire
  if (!name || !email || !message) {
    res.status(400).json({ error: "Tous les champs sont requis !" });
  }

  // la transmettre la demande utilsateur vers le service d'envoi de Email
  // Enregistrer en base de données la demande utilisateur
  // retourner un message a l'utilisateur
});
