import { v2 as cloudinary } from 'cloudinary';


export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
        cloud_name:  "dfkrjwh5l",
        api_key: "672277124844951",
        api_secret:
        "DLi27qyjxexmSYq1Rg14JuFAppc",
    });
  },
};