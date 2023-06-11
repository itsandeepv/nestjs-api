import { Schema } from 'mongoose';

export const BlogSchema = new Schema({
  title: String,
  content: String,
  id : String,
  author: String,
  images: [],
  discription: String,
  published:String
});
