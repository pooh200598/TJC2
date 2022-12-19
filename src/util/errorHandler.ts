import { Response, NextFunction } from "express";
import { HTTP404Error, HTTPError } from "../util/httpErrors";
import { Config } from "../config/application";

export const notFoundError = (res: Response, next: NextFunction) => {
  const err = new HTTP404Error("Method not found");
  res.status(err.statusCode).send({ message: err.message });
};

export const sendError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPError) {
    if (err.statusCode === 500) {
      console.error(err);
    } else {
      console.warn(err);
    }
    if (Config.sendErrorStack === false) {
      res.status(err.statusCode).send({ message: err.message });
    } else {
      res.status(err.statusCode).send({ err, stack: err.stack });
    }
  } else {
    console.warn(
      "ERROR NOT HANDLED!! - PLEASE USE ERROR CLASS WHILE DEFINING ERROR!!!!"
    );
    next(err);
  }
};
