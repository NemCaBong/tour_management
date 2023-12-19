import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotnev from "dotenv";
import Tour from "./models/tour.model";
import clientRoutes from "./routes/client/index.route";

dotnev.config();

// sequelize chỉ là 1 cái obj thôi
// chỉ cần dùng nó
sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

// routes for client
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
