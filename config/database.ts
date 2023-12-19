import { Sequelize } from "sequelize";
import dotenv from "dotenv";
// chỗ nào cần dùng phải import
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // tên db
  process.env.DATABASE_USERNAME, // tên username
  process.env.DATABASE_PASSWORD, // mật khẩu
  {
    host: process.env.DATABASE_HOST, // tên host, có thể là đg link đến db
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect successfully");
  })
  .catch((error) => {
    console.error("Connect error: ", error);
  });
export default sequelize;
