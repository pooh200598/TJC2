import { Request, Response, NextFunction } from "express";
import * as loginController from "./loginController";
import { sendError } from "../../util/errorHandler";
import { HTTPError } from "../../util/httpErrors";
import { validate } from "./loginValidation";
import { Types } from "ts-openapi";
const ADMIN_LOGIN_PAYLOAD = {
  email: Types.String({
    description: "email",
    example: "xyz@gmail.com",
  }),
  password: Types.String({
    description: "password",
    example: "xyz@123",
  }),
};
export default [
  {
    path: "/login",
    method: "post",
    description: "LOGIN API",
    tags: ["Login"],
    summary: "APPI TO LOGIN",
    payload: ADMIN_LOGIN_PAYLOAD,
    handler: [
      validate("login"),
      (req: Request, res: Response, next: NextFunction) => {
        loginController
          .login(req, res)
          .then((r) => res.status(200).send(r))
          .catch((e: HTTPError) => sendError(e, res, next));
      },
    ],
  },
];
