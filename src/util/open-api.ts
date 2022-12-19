import { Application } from "express";
import { OpenApi } from "ts-openapi";
import { applyRoutes } from "../util";
import swaggerUi from "swagger-ui-express";
import { Config } from "../config/application";

// create an OpenApi instance to store definitions
export const clientOpenApiInstance = new OpenApi(
  "v1.0", // API version
  "TJC APIs", // API title
  "Describing how to keep APIs documented.", // API description
  "nelson.gomes@pipedrive.com" // API maintainer
);

// declare servers for the API
clientOpenApiInstance.setServers([{ url: `${process.env.SWAGGER_URL}` }]);
// adminOpenApiInstance.setServers([{ url: "http://localhost:8081/api/v1" }]);

// set API license
clientOpenApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);

export const initOpenApi = (
  app: Application,
  openApi: OpenApi,
  path: string,
  routes: any
) => {
  return new Promise(async (resolve, reject) => {
    applyRoutes(routes, app, "/api/v1", openApi);
    const openApiJson: any = openApi.generateJson();
    // declare security schemes available, each with an ID
    openApi.declareSecurityScheme("bearerSecurity", {
      type: "apiKey",
      in: "header",
      name: "token",
    });
    // declare our API
    // declare global schemes (applicable to all methods)
    openApi.addGlobalSecurityScheme("bearerSecurity");
    // we'll create an endpoint to reply with openapi schema
    app.get(`/${path}.json`, function (_req, res) {
      res.json(openApiJson);
    });
    // this will make openapi UI available with our definition
    console.info(`Server is running http://localhost:8089${path}`);
    // // openApiJson.path = path;
    // let val: any = {}
    // Object.keys(openApiJson.paths).forEach((key) => {
    //     val[path + key] = openApiJson.paths[key]
    // })
    // openApiJson.paths = val
    resolve(openApiJson);
    // generate our OpenApi schema
  });
};

export function swaggerConfiguration(app: Application, openApiJson: any) {
  console.log(JSON.stringify(openApiJson));

  app.use("/test", swaggerUi.serve, swaggerUi.setup(openApiJson));
}
