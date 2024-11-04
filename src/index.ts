import express from "express";
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
