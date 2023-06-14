import { Schema, Document, model } from 'mongoose';

export interface Ourworks extends Document {
  name: string;
  description: string;
  imageUrl: string;
}

export const OurworksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  websiteLink: String,
  review: Number,
  title: String,
  siteimages:[],
},{timestamps:true});

export const OurworksModel = model<Ourworks>('OurWorks', OurworksSchema);
