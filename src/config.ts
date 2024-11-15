import * as dotenv from "dotenv";

/**
 * Fichier en charge de la gestion des variables du projet avec interface pour les
 * type et la fonction de chargement.
 */

// Charger les variables d'environnement du fichier .env
dotenv.config();

interface Config {
  PORT: string; // port API
  FROM: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_SCHEMA: string;
  DB_TABLE: string;
  ADMIN_EMAIL_PROTON: string;
  ADRESSE_SMTP: string;
  AUTH_USER: string;
  AUTH_PASSWORD: string;
}

// Fonction pour charger et valider les variables d'environnement
function loadConfig(): Config {
  const {
    PORT,
    FROM,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_SCHEMA,
    DB_TABLE,
    ADMIN_EMAIL_PROTON,
    ADRESSE_SMTP,
    AUTH_USER,
    AUTH_PASSWORD,
  } = process.env;

  if (
    !PORT ||
    !FROM ||
    !DB_NAME ||
    !DB_USER ||
    !DB_PASSWORD ||
    !DB_HOST ||
    !DB_PORT ||
    !DB_SCHEMA ||
    !DB_TABLE ||
    !ADMIN_EMAIL_PROTON ||
    !ADRESSE_SMTP ||
    !AUTH_USER ||
    !AUTH_PASSWORD
  ) {
    throw new Error(
      "Les variables d'environnement pour la base de données sont incomplètes. Vérifiez votre fichier .env"
    );
  }
  return {
    PORT,
    FROM,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT: parseInt(DB_PORT, 10), // Conversion en nombre
    DB_SCHEMA,
    DB_TABLE,
    ADMIN_EMAIL_PROTON,
    ADRESSE_SMTP,
    AUTH_USER,
    AUTH_PASSWORD,
  };
}

// Exporter la configuration validée
export default loadConfig();
