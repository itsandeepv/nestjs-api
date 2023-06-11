import { Schema, Document, model } from 'mongoose';

export interface Ourworks extends Document {
  name: string;
  description: string;
  imageUrl: string;
}

const ourworksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const OurworksModel = model<Ourworks>('ourworks', ourworksSchema);
