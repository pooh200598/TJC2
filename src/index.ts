import http from "http";
import express from "express";
import { Config } from "./config/application";
import { applyMiddleware } from "../src/util";
import middleware from "./middleware";
import errorHandlers from "./middleware/error404";
import routes from "./services/index";
import swaggerUi from "swagger-ui-express";
import { clientOpenApiInstance, initOpenApi } from "./util/open-api";
process.on("uncaughtException", (e) => {
  if (e) console.error(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  if (e) console.error(e);
  process.exit(1);
});
const router = express();

applyMiddleware(middleware, router);
async function swaggerImplement() {
  const allApisJson: any = await initOpenApi(
    router,
    clientOpenApiInstance,
    "/client-apis",
    routes
  );
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(allApisJson));
  applyMiddleware(errorHandlers, router);
}
swaggerImplement();
const server = http.createServer(router);
if (process.env.NODE_ENV !== "test") {
  server.listen(Config.serverPort, async () => {
    console.info(`Server is running http://localhost:${Config.serverPort}...`);
  });
}

module.exports = router;
