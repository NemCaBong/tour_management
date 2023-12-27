import express, { Express } from "express";
import dotnev from "dotenv";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
dotnev.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static(`public`));
app.set("views", "./views");
app.set("view engine", "pug");

// App locals var
app.locals.moment = moment;

// routes for client
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
