import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: String,
    email: {
      type: String,
      required: true,
    },
    image:  {
        type: [],
        // required: true,
      },
      password: {
      type: String,
      required: true,
    },
    role: {
      type:String,
      default: "user"
    },
    address: String,
  },
  {
    timestamps: true,
  },
);

export interface Users extends mongoose.Document {
  fname: string;
  lname: string;
  role: string;
  email: string;
  password: string;
  address: string;
}

export const UsersModel = mongoose.model<Users>('User', UserSchema);
