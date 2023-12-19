import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotnev from "dotenv";

dotnev.config();

// sequelize chỉ là 1 cái obj thôi
// chỉ cần dùng nó
sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  res.send("Trang chủ");
});
app.get("/tours", (req: Request, res: Response) => {
  res.render("client/pages/tours/index");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
