import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  saltKey: process.env.SALT_KEY,
  defaultPass: process.env.DEFAULT_PASS,
  jwt_token: process.env.ACCESS_TOKEN,
};
