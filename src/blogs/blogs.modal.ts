import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    author: {
      type: String,
      required: true,
    },
    image:  {
        type: [],
        // required: true,
      },
      description: {
      type: String,
      required: true,
    },
    published: String,
  },
  {
    timestamps: true,
  },
);

export interface Blogs extends mongoose.Document {
  author: string;
  content: string;
  title: string;
  image: string;
  description: string;
  published: string;
}

export const BlogsModel = mongoose.model<Blogs>('blogs', BlogSchema);
