import { validationResult } from "express-validator";
import { HTTP400Error } from "../../util/httpErrors";
export const login = async (req: any, res: any) => {
  try {
    if (!req.body) {
      const e = new HTTP400Error("Bad Request - Invalid payload");
      throw e;
    }
    const errors: any = validationResult(req);
    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    let existUser = email === "pooh11198@gmail.com";
    if (!existUser) {
      return res
        .status(400)
        .json({ msg: `your mail is not correct..${email}` });
    }
    if (password !== "Test@123") {
      const msg = "You have logged in successfulyy....";
      return res.status(400).json({ msg: `Password is incorrect..` });
    }
    if (existUser && password === "Test@123") {
      return res.status(200).json({ msg: `Logged in...` });
    }
  } catch (e: any) {
    return res.status(400).json({ msg: `${e.message}` });
  }
};
