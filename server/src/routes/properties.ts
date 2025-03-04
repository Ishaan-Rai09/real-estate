import express from 'express';
import { checkUserId } from '../middleware/auth';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    // TODO: Implement property listing logic
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export const propertyRouter = router; 