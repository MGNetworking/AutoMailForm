import express from "express";
import favicon from "serve-favicon";

console.log("Run this projet ...");

const app = express();
const port = 3010;

// middlewares
app.use(favicon(__dirname + "/favicon.ico"));
