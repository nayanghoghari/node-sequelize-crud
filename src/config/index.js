require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { cleanEnv, port, host, str } = require("envalid");

exports.APP_CONFIG = cleanEnv(process.env, {
  PORT: port({ devDefault: 8080, desc: "Application Port." }),
  DB_HOST: host({ devDefault: "127.0.0.1", desc: "Database Host" }),
  DB_PORT: port({ devDefault: 3306, desc: "Database Port" }),
  DB_USER: str({ desc: "Database Username" }),
  DB_PASSWORD: str({ desc: "Database Password" }),
  DB_NAME: str({ desc: "Database Name" }),
  ACCESS_TOKEN_SECRET: str({ desc: "Access Token Secret" }),
});

exports.ROLES = ["admin", "user", "supplier", "customer"]