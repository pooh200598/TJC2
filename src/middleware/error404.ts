import { Request, Response, NextFunction, Router } from "express";
import * as ErrorHandler from "../util/errorHandler";

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.notFoundError(res, next);
  });
};

export default [handle404Error];
