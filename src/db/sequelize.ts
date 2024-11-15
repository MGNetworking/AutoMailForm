import { Sequelize } from "sequelize";
import config from "../config";

export class Database {
  private static instance: Sequelize;

  private constructor() {}

  /**
   * Permet de créer la connexion a la base de données et
   * retourne une instance de connexion
   * @returns instant de connexion de type Sequelize
   */
  public static getInstance(): Sequelize {
    // Singleton pour éviter plusieurs instances de connexion
    if (!Database.instance) {
      // Données d'authentifcation
      Database.instance = new Sequelize(
        config.DB_NAME,
        config.DB_USER,
        config.DB_PASSWORD,
        {
          host: config.DB_HOST, // Adresse du serveur PostgreSQL
          port: config.DB_PORT, // le port de connexion
          dialect: "postgres", // Spécifie PostgreSQL comme dialecte
          schema: config.DB_SCHEMA, // les schema dans la BD
          logging: (msg) => console.log(msg),
        }
      );
    }
    console.log("Authentification de la connexion en cours ...");
    // Authentification de la connexion
    Database.instance
      .authenticate()
      .then(() => {
        console.log("Connexion à la base de données réussie");
      })
      .catch((err) => {
        console.error("Erreur de connexion à la base de données :", err);
      });

    return Database.instance;
  }
}
