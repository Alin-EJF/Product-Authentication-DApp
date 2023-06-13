import { Request, Response, NextFunction } from 'express';
import {User} from '../models/user'; 
import { Provider } from '../models/provider'; 

export const validateLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password} = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
  } else {
    next();
  }
};


export const validateRegistrationInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, userType, CIF, trade_register_number, legal_name, phone_number } = req.body;

  if (!email || !password || !userType) {
    res.status(400).json({ message: 'Email, password, and userType are required' });
  } else if(userType === 2) {
    //as Provider
    const provider: Provider = { email, password, userType, CIF, trade_register_number, legal_name, phone_number };
    if (!validateProvider(provider)) {
      res.status(400).json({ message: 'Invalid provider data' });
      return;
    }
  }
  //other userType, validate as User
  else {
    const user: User = { email, password, userType };
    if (!validateUser(user)) {
      res.status(400).json({ message: 'Invalid user data' });
      return;
    }
  }

  next();
};

const validateUser = (user: User): boolean => {
  return user.email !== undefined && user.password !== undefined && user.userType !== undefined;
};

const validateProvider = (provider: Provider): boolean => {
  return (
    provider.email !== undefined &&
    provider.password !== undefined &&
    provider.userType !== undefined &&
    provider.CIF !== undefined &&
    provider.trade_register_number !== undefined &&
    provider.legal_name !== undefined &&
    provider.phone_number !== undefined
  );
};

