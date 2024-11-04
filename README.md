# AutoMAILForm

## Dependencies and their use

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
