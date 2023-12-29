import express, { Express } from "express";
import dotnev from "dotenv";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";
dotnev.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(`public`));
app.set("views", "./views");
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App locals var
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// routes
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
