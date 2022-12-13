import { body } from "express-validator";

export const validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("email", "email id  is missing").isEmail(),
        body("password", "password length should be 8")
          .isLength({ min: 8 })
          .isString(),
      ];
    }
  }
};