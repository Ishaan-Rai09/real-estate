import express, { Request, Response } from 'express';
import { checkUserId } from '../middleware/auth';
import { User } from '../models/User';
import { Property } from '../models/Property';
import mongoose from 'mongoose';

const router = express.Router();

// Get user's favorite properties
router.get('/', checkUserId, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add property to favorites
router.post('/:propertyId', checkUserId, async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const user = req.user;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Add to favorites if not already added
    const propertyObjectId = new mongoose.Types.ObjectId(propertyId);
    if (!user.favorites.some((id: mongoose.Types.ObjectId) => id.equals(propertyObjectId))) {
      user.favorites.push(propertyObjectId);
      await user.save();
    }

    res.json({ message: 'Property added to favorites' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove property from favorites
router.delete('/:propertyId', checkUserId, async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const user = req.user;

    user.favorites = user.favorites.filter((id: mongoose.Types.ObjectId) => !id.equals(new mongoose.Types.ObjectId(propertyId)));
    await user.save();

    res.json({ message: 'Property removed from favorites' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const favoritesRouter = router; 