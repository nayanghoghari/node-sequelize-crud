const { createServer } = require("http");

const { APP_CONFIG } = require("./config");
const { app } = require("./app/app");
const { connectDB } = require("./utils/db.util");

const server = createServer(app);
const port = APP_CONFIG.PORT;

connectDB()
  .then(() => {
    console.log("\nDatabase Connected");
    server.listen(port, () => {
      console.log(`Server is up and running at ${port}`);
    });
  })

  .catch((err) => {
    console.log("Database Connection Failed", err.message);
  });
