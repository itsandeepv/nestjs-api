import { diskStorage } from "multer";


export const multerConfig = {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
      //   const fileName = uuidv4();
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + fileName+ file.originalname)
        cb(null, fileName);
      },
    }),
  };