import mongoose, { Document } from 'mongoose';

// Define the interface for Property document
export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  agent: mongoose.Types.ObjectId;
  status: 'available' | 'sold' | 'rented';
  type: 'house' | 'apartment' | 'condo' | 'land';
  createdAt: Date;
}

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  features: [{
    type: String
  }],
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available'
  },
  type: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'land'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Property = mongoose.model<IProperty>('Property', propertySchema); 