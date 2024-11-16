# AutoMAILForm

AutoMailForm is an API service designed to facilitate the automated sending of emails from form data, while ensuring reliable and secure transmission to other systems. It provides a simple integration layer to automate email communication and data processing.

- [Dependencies](#Dependencies)
- [TypeScript Configuration base](#typescript-configuration-base)
- [Structure de la Table pour les Logs d’E-mails](#structure-de-la-table-pour-les-logs-de-mails)

## installation

Clone the repository and install dependencies

```shell
npm install
```

#### File .env

!!! Very important before you start !!!

This configuration file is central. It is used to configure the SMTP server and database connection identifiers.

Change file name `.env.example` to `.env` and add your config server and database.

For the configuration of the `.env` file, the `cross-env` dependency allows the `NODE_ENV` environment variable to be used in the `start:prod` and `start:dev` launch scripts

#### Run mode

Run in development mode

```shell
npm run start:dev
```

this mode reloads the API each time it is saved

Mode prod

```shell
# build your API
npm run build

# and run
npm run start:prod
```

## Dependencies

1. Express installation

```shell
# Dependencies
npm install express --save
# typing
npm install --save-dev @types/express
```

- Documentation
  express: https://expressjs.com/

2. favicon installation

```shell
# Dependencies
npm install serve-favicon --save
# typing
npm install --save-dev @types/serve-favicon
```

- Documentation
  favicon: https://www.npmjs.com/package/serve-favicon

3. node mailer

```shell
# Dependencies
npm install nodemailer --save
# typing
npm install --save-dev @types/nodemailer
```

- Documentation
  nodemailer: https://www.npmjs.com/package/nodemailer

4. dotenv

```shell
# Dependencies
npm install dotenv --save
# typing
npm install --save-dev @types/dotenv
```

- Documentation
  dotenv: https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage

5. sequelize

```shell
# Dependencies
npm install sequelize pg pg-hstore --save

# typing
npm install --save-dev @types/sequelize
```

- `pg` : This is the PostgreSQL client module for Node.js. Sequelize uses this package to connect to a PostgreSQL database and execute SQL queries. `pg` is required for Sequelize to interact with a PostgreSQL database.

- `pg-hstore` : This is a package that helps Sequelize manage PostgreSQL's hstore data type, a key-value data type native to PostgreSQL. pg-hstore is required so that Sequelize can manage hstore fields, even if your model does not use this specific type.

* Documentation : https://sequelize.org/
  sequelize: https://www.npmjs.com/package/sequelize

6. copyfiles

```shell
# Dependencies
npm install --save-dev copyfiles
```

added an example of the script used in package.json

```json
"scripts": {
  "build": "tsc && copyfiles -u 1 src/favicon.ico dist"
}
```

- `-u 1` : Retire le premier niveau de répertoires pour copier uniquement le fichier.
- `src/favicon.ico dist` : Définit le chemin source et destination.

* Documentation
  copyfiles: https://www.npmjs.com/package/copyfiles

7. cross-env

```shell
# Dependencies
npm install --save-dev cross-env
```

added an example of the script used in package.json

```json
"scripts": {
  "build": "cross-env MyVarible=something tsc "
}
```

- Documentation
  cross-env: https://www.npmjs.com/package/cross-env

## TypeScript Configuration base

1. For use TypeScript in this projet, you will need this dependencie

```shell
npm install typescript @types/node --save-dev
```

2. And create a configuration file `tsconfig.json` at the root of the project with this command `npx tsc --init`.

And add this config in your `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

- `outDir` : defines the folder where compiled files will be generated (dist in this example).
- `rootDir` : indicates the source folder for your TypeScript files.

3. Create a src folder for your source TypeScript files: `mkdir src`

4. Create a startup TypeScript file: In the src folder, create an `index.ts` file

5. Compile the TypeScript code : To compile the TypeScript code in JavaScript, run : `npx tsc`

This will generate the compiled JavaScript files in the dist folder (or another folder, depending on your outDir configuration).

Once the code has been compiled, run it with Node.js : `node dist/index.js`

6. Configure a startup command in package.json: Add a startup script to simplify the execution of your project:

```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "ts-node-dev --respawn src/index.ts"
}
```

`start` : executes the compiled JavaScript code. `npm run start`
`build` : compiles the TypeScript project. `npm run build`
`dev` : starts the project in development mode with `ts-node-dev`, a tool that automatically reloads the server if any changes are made. `npm run dev`

Install `ts-node-dev` for development (optional but recommended): To use development mode with automatic reloading, install ts-node-dev:

```shell
npm install ts-node-dev --save-dev
```

Start the project in development mode: Use the following command to start the project in development mode:

```shell
npm run dev
```

## Structure de la Table pour les Logs d’E-mails

| Champ      | Type      | Description                                                  | Correspondance avec les informations d'envoi |
| ---------- | --------- | ------------------------------------------------------------ | -------------------------------------------- |
| id         | INTEGER   | Clé primaire, auto-incrémentée                               | Auto-générée                                 |
| provider   | STRING    | Le fournisseur utilisé pour l’envoi (Proton, Gmail, etc.)    | "Proton", "Gmail", ou "User"                 |
| recipient  | STRING    | L'adresse e-mail du destinataire                             | recipient                                    |
| sender     | STRING    | L'adresse e-mail de l'expéditeur                             | sender                                       |
| subject    | STRING    | Sujet de l'e-mail                                            | subject                                      |
| message    | TEXT      | Contenu du message envoyé                                    | message                                      |
| status     | STRING    | Statut d’envoi : "sent" ou "failed"                          | fulfilled ou rejected                        |
| response   | TEXT      | La réponse ou erreur reçue du serveur SMTP                   | response (ou reason en cas d’erreur)         |
| message_id | STRING    | Identifiant unique du message assigné par le serveur SMTP    | messageId                                    |
| accepted   | BOOLEAN   | Indique si l’e-mail a été accepté pour envoi                 | accepted                                     |
| rejected   | BOOLEAN   | Indique si l’e-mail a été rejeté                             | rejected                                     |
| envelope   | JSON      | Détails de l’enveloppe d’e-mail (expéditeur et destinataire) | envelope                                     |
| created_at | TIMESTAMP | Date de la tentative d’envoi                                 | Généré automatiquement par Sequelize         |
