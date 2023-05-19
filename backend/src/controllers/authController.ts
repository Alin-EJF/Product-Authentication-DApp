import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user";

const jwt = require("jsonwebtoken");
const jwtSecret = "oighasdihhasdandasndsaiodnasd";
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await createUser(email, hashedPassword);

  if (newUser) {
    res
      .status(201)
      .json({ message: "User registered successfully", email: newUser.email });
  } else {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
   
    jwt.sign({ email: user.email }, jwtSecret, {}, (err: any, token: string) => { //+user.id and more
        if (err) throw err;
        console.log;
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60*60*1000 // 1h
          })
          .json(user);
      }
    );
    //res.status(200).json({ message: 'Login successful'});
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
