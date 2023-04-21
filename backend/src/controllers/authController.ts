import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/user';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409).json({ message: 'User with this email already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await createUser(email, hashedPassword);

  if (newUser) {
    res.status(201).json({ message: 'User registered successfully', email: newUser.email });
  } else {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // session or JWT token for auth
    res.status(200).json({ message: 'Login successful', email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
