import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Ourworks, OurworksModel } from './ourworks.modal';
import { Model } from 'mongoose';

 const multerConfig = {
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

@Controller('formdata')
export class OurworksController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadOurworks(
    @UploadedFile() file,
    @Body() formData: { name: string; description: string },
  ){
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;    
    const data = new OurworksModel({
      name: formData.name,
      description: formData.description,
      imageUrl: imageUrl,
    });
    const savedData = await data.save();
    console.log(data ,savedData);


    return { formData: data };
  }
}