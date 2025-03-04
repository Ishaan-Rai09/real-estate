import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Simple middleware to check if a user ID is provided in the query
export const checkUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add user info to request for convenience
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user is an agent
export const checkAgent = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'agent') {
      return res.status(403).json({ message: 'Agent access required' });
    }
    
    // Add user info to request for convenience
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user is an admin
export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    // Add user info to request for convenience
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 