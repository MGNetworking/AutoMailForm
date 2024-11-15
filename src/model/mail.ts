import { Model, DataTypes } from "sequelize";
import { Database } from "../db/sequelize";
import config from "../config";

/**
 * Classe de model pour l'enregitrement des log
 */
export class EmailLog extends Model {
  public id!: number;
  /** Le fournisseur de messagerie utilisé pour l'envoi, par exemple "ProtonMail" ou "Gmail" */
  public fournisseur!: string;

  /** L'adresse e-mail du destinataire */
  public destinataire!: string;

  /** L'adresse e-mail de l'expéditeur */
  public expediteur!: string;

  /** L'objet de l'e-mail */
  public sujet!: string;

  /** Le contenu principal du message envoyé */
  public message!: string;

  /** Statut de l'envoi, indiquant si l'e-mail a été "sent" ou a "failed" */
  public status!: string;

  /** La réponse du serveur SMTP après tentative d'envoi, contenant le statut de l'envoi ou une erreur */
  public response!: string;

  /** Identifiant unique du message généré par le serveur SMTP */
  public message_id!: string | null;

  /** Indique si le serveur de messagerie a accepté l'e-mail pour livraison */
  public accepted!: string[] | null;

  /** Indique si l'e-mail a été rejeté par le serveur de messagerie */
  public rejected!: string[] | null;

  /** Enveloppe SMTP contenant des informations techniques sur l'expéditeur et le destinataire */
  public envelope!: object | null;

  /** La date de création du log  */
  public created!: Date;

  /**
   * Permet la syncronisation du model avec BD
   * et créer la table dans le schèmas si elle n'existe pas.
   */
  public static async initialize(): Promise<void> {
    try {
      // déclaration du modèle
      EmailLog.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          fournisseur: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          destinataire: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          expediteur: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          sujet: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          message: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          response: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          message_id: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          accepted: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
          rejected: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
          envelope: {
            type: DataTypes.JSON,
            allowNull: true,
          },
        },
        {
          sequelize: Database.getInstance(),
          modelName: "EmailLog",
          tableName: config.DB_TABLE,
          timestamps: true, // Active les timestamps avec `createdAt` et `updatedAt` automatiquement
          createdAt: "created", // Renomme `createdAt` en `created`
          updatedAt: false, // Désactive `updatedAt`
        }
      );

      // Synchronisation de la table avec la base de données et la créer si n'existe pas
      await EmailLog.sync({ alter: true });
      console.log(
        `La table ${config.DB_NAME} est synchronisée avec le modèle EmailLog.`
      );
    } catch (error) {
      console.error(
        `Erreur de synchronisation avec la base de données : ${config.DB_NAME}`,
        error
      );
      throw new Error(
        `La synchronisation du modèle EmailLog a échoué. Vérifiez les configurations de la base de données: ${config.DB_NAME}`
      );
    }
  }

  public static async logEmail(
    fournisseur: string,
    info: any,
    destinataire: string,
    expediteur: string,
    sujet: string,
    message: string
  ): Promise<void> {
    const log = await EmailLog.create({
      fournisseur,
      destinataire,
      expediteur,
      sujet,
      message,
      status: info.status === "fulfilled" ? "sent" : "failed",
      response:
        info.status === "fulfilled"
          ? info.value.response
          : JSON.stringify(info.reason), // Enregistre toute la réponse d'erreur
      message_id:
        info.status === "fulfilled"
          ? info.value.messageId
          : info.reason?.messageId || null,
      accepted: info.status === "fulfilled" ? info.value.accepted : [],
      rejected: info.status === "fulfilled" ? info.value.rejected : [],
      envelope:
        info.status === "fulfilled"
          ? info.value.envelope
          : { from: expediteur, to: destinataire },
    });
    console.log("Log créé :", log.toJSON());
  }
}
