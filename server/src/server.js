const dotenv = require("dotenv");
const database = require("./configs/database");
const createServer = require("./helpers/create_server");
const Logger = require("./helpers/logger");
const applyMiddlewares = require("./middlewares");
const errorHandler = require("./middlewares/error_handler");
const routes = require("./routes");

dotenv.config();
database.connect();

const PORT = process.env.PORT || 8080;

function lauchServer(port) {
  const app = createServer();
  applyMiddlewares(app);
  routes(app);
  app.use(errorHandler);

  app.listen(port, () => {
    Logger.info(`App is listening at ${port}`);
  });
}

lauchServer(Number(PORT));

module.exports = lauchServer;
