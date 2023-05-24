import { Request, Response, NextFunction } from 'express';

export const validateLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password} = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
  } else {
    next();
  }
};

export const validateRegistrationInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    res.status(400).json({ message: 'Email, password, and userType are required' });  //TODO : ADD MORE VALIDATIONS
  } else {
    next();
  }
};
