import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user";
import { createProvider, findProviderByEmail } from "../models/provider";

const jwt = require("jsonwebtoken");
const jwtSecret = "oighasdihhasdandasndsaiodnasd";
const SALT_ROUNDS = 10;

const handleRegister = async (userData: any, res: Response) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  let newUser;

  if (userData.userType === 2) {
    newUser = await createProvider({ ...userData, password: hashedPassword });
  } else {
    newUser = await createUser({ ...userData, password: hashedPassword });
  }

  if (newUser) {
    const message = userData.userType === 2 ? "Provider registered successfully" : "User registered successfully";
    res.status(201).json({ message, email: newUser.email });
  } else {
    res.status(500).json({ message: "Error registering user" });
  }
};



export const register = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }

  handleRegister(req.body, res);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  let account:any = await findProviderByEmail(email); // TODO: change from any

  if (!account) {
    account = await findUserByEmail(email);
  }

  if (!account) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, account.password);
  account.password = undefined; //not needed
  

  if (isPasswordValid) {
    jwt.sign({ email : account.email , userType: account.userType}, jwtSecret, {}, (err: any, token: string) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60*60*1000 // 1h
          })
          .status(200).json(account);
      }
    );
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


export const profiletoken = async (req: Request,res: Response): Promise<void> => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err: any, user: any) => {
      if (err) throw err;

      let account:any = await findProviderByEmail(user.email); // TODO: change from any

      if (!account) {
        account = await findUserByEmail(user.email);
      }
      if (account) {
        account.password = undefined;
      }
      res.json(account);
    });
  } else {
    res.json(null);
  }
};

export const logout = async (req: Request,res: Response): Promise<void> => {
  res.clearCookie('token').sendStatus(200);
};


