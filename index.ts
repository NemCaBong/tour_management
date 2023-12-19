import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotnev from "dotenv";
import Tour from "./models/tour.model";

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
app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      status: "active",
      deleted: false,
    },
    raw: true,
  });
  console.log(tours);
  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
