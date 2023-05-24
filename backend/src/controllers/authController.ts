import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user";

const jwt = require("jsonwebtoken");
const jwtSecret = "oighasdihhasdandasndsaiodnasd";
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, userType } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await createUser(email, hashedPassword, userType);

  if (newUser) {
    res
      .status(201)
      .json({ message: userType === 2 ? "Provider registered successfully" : "User registered successfully", email: newUser.email });
  } else {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password} = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    jwt.sign({ email: user.email }, jwtSecret, {}, (err: any, token: string) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60*60*1000 // 1h
          })
          .status(200).json(user);
      }
    );
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const profiletoken = async (req: Request,res: Response): Promise<void> => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err: any, user: any) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

export const logout = async (req: Request,res: Response): Promise<void> => {
  res.clearCookie('token').sendStatus(200);
};
