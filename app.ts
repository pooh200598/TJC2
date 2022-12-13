import express from "express";
import { validationResult } from "express-validator";
import { validate } from "./validate";

const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/login", validate("login"), function (req: any, res: any) {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: `mail id is wrong..` });
    }
    const errors = validationResult(req);
    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    if (email === "pooja@gmail.com" && password === "Pooja@123") {
      return res.status(200).json({ msg: `Logged in Successfully!!!!` });
    }
    if (email !== "pooja@gmail.com") {
      return res.status(400).json({ msg: `mail id is wrong..` });
    }
    if (password === "Pooja@123") {
      return res.status(400).json({ msg: `password is wrong..` });
    }
  } catch (e) {
    return res.status(400).json({ msg: `${e.message}` });
  }
});
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
