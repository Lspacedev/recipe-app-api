import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 25 characters.";
const passLengthErr = "must be between 5 and 25 characters.";

const validateRegister = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`Username ${lengthErr}`),
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("password")
    .isLength({ min: 5, max: 25 })
    .withMessage(`Password ${passLengthErr}`),
];

const userRegister = [
  validateRegister,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
      });
    }
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        role,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occured during registration" });
    }
  },
];

async function userLogin(req, res) {
  try {
    const { username, password } = req.body;
    const [user] = await User.find({ username });
    if (user.length === 0) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      message: "Auth Passed",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured while logging in." });
  }
}

export default { userRegister, userLogin };
