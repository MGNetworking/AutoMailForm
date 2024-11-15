import { Request, Response } from "express";

export class EmailUtils {
  public static checkData(req: Request): { valid: boolean; message?: string } {
    const { name, email, messageUser, testlenght } = req.body;

    if (!name && !email && !messageUser) {
      console.error("Tout les champs du formulaire sont vide");
      return { valid: false, message: "Tous les champs sont requis !" };
    }

    // EMAIL
    if (!email || email.trim() === "") {
      console.error("Le champs E-mail est vide ", email);
      return { valid: false, message: "Le champs E-mail est vide" };
    } else if (!EmailUtils.isValidEmail(email)) {
      console.error("Le format l'adresse E-mail est incorrect: ", email);
      return { valid: false, message: "Format incorrect de l'adresse mail" };
    }

    // Name
    if (name.trim().length === 0) {
      console.error("le nom est vide", name);
      return { valid: false, message: "Nom vide ou absent" };
    }

    // Message
    if (testlenght === 0) {
      console.error("Nombre de lignes dans votre texte non défini ou absent");
      return {
        valid: false,
        message: "Nombre de lignes dans votre texte non défini.",
      };
    } else if (!EmailUtils.isStringLengthValid(messageUser, testlenght)) {
      console.error(
        "Nombre de caractère dans votre texte client est trop cours"
      );
      return {
        valid: false,
        message: "Nombre de caractère dans votre texte client est trop cours",
      };
    }

    return { valid: true };
  }

  private static isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  /**
   * Fonction qui permet de vérifier le nombre de caractère
   * @param str votre chain a testé
   * @param minLength la tail mini demandé
   * @returns un boolean
   */
  private static isStringLengthValid(str: string, minLength: number): boolean {
    return str.length >= minLength;
  }
}
