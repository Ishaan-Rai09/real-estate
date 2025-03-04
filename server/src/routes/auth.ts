import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User';

const router = express.Router();

// Sign up
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'user'
    });

    await user.save();

    res.status(201).json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign in
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    console.log('Signin attempt:', { email, passwordProvided: !!password });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', { userId: user._id, userEmail: user.email });

    // Check password
    console.log('Stored password hash:', user.password);
    console.log('Attempting to compare with provided password');
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug route to check if a user exists (for development only)
router.get('/check-user/:email', async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Only return this in development environment
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        exists: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          passwordHash: user.password.substring(0, 10) + '...',
          role: user.role
        }
      });
    } else {
      return res.json({ exists: true });
    }
  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug route to test password comparison (for development only)
router.post('/test-password', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Only available in development environment
    if (process.env.NODE_ENV !== 'production') {
      const isMatch = await bcrypt.compare(password, user.password);
      
      return res.json({
        email: user.email,
        passwordProvided: password,
        passwordHashStored: user.password.substring(0, 10) + '...',
        isMatch
      });
    } else {
      return res.status(403).json({ message: 'Not available in production' });
    }
  } catch (error) {
    console.error('Test password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const authRouter = router; 