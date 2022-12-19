const { body } = require("express-validator");

export const validate = (method: any) => {
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
