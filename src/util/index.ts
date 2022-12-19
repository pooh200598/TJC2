import { Router, Request, Response, NextFunction } from "express";
import { OpenApi, textPlain, Types } from "ts-openapi";

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  for (const f of middleware) {
    f(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (
  routes: any[],
  router: Router,
  baseRoute: string,
  openApi: OpenApi
) => {
  for (const route of routes) {
    const { method, path, handler, description, summary, tags } = route;
    let finalPath: any = baseRoute + path;
    (router as any)[method](finalPath, handler);
    // declare our API

    openApi.addPath(
      path, // this is API path
      {
        // API method
        [method]: {
          description, // Method description
          summary, // Method summary
          operationId: Math.random().toString(), // an unique operation id
          ...getMethodName(method, route.payload || {}, route.params || []),
          tags, // these tags group your methods in UI
          responses: {
            // here we declare the response types
            200: textPlain("Successful Operation"),
          },
        },
      },
      true // make method visible
    );
  }
};

function getMethodName(
  method: string,
  payload: any,
  allParams: { name: string; required: boolean }[]
) {
  const params = allParams.reduce((acc, { name, required }) => {
    acc[name] = Types.String({
      description: `${name} need to be passed here`,
      required,
    });
    return acc;
  }, {} as { [key: string]: any });

  switch (method) {
    case "get":
      return {
        requestSchema: {
          params,
        },
      };
    case "post": {
      return {
        requestSchema: {
          body: Types.Object({
            properties: payload,
          }),
          params,
        },
      };
    }
    case "put": {
      return {
        requestSchema: {
          params,
          body: Types.Object({
            properties: payload,
          }),
        },
      };
    }
    case "delete": {
      return {
        requestSchema: {
          params,
        },
      };
    }

    default:
  }
}
