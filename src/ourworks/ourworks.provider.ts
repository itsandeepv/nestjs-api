import {
    HttpStatus,
    Injectable,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { NotFoundException } from '@nestjs/common';
  import { uuid } from 'uuidv4';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Ourworks, OurworksModel } from './ourworks.modal';
  import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { multerConfig } from '../blogs/multer-config';
  import { ConfigService } from '@nestjs/config';
  // import v2 as cloudinary from 'cloudinary';
  const cloudinary = require('cloudinary');
  import { CloudinaryResponse } from 'src/cloundanery/cloud.res';
  const streamifier = require('streamifier');
  
  import { CloudinaryService } from 'src/cloundanery/cloudinary.service';
  
  @Injectable()
  export class OurworksProvider {
    constructor(@InjectModel('OurWorks') private readonly ourwokModel: Model<Ourworks>) {}
    @UseInterceptors(FileInterceptor('siteimages', multerConfig))
    async addBlogs(
      ourwork: {
        name: string;
        description: string;
        websiteLink: string;
        title: string;
        review: Number,

        siteimages: [];
      },
      file,
    ) {
      const imageurl = [];
      await cloudinary.uploader.upload(file.path, (res, error) => {
        // console.log(res, '<<<<<<<', error);
        imageurl.push({
          asset_id: res.asset_id,
          url: res?.secure_url,
        });
      });
      const data = await new this.ourwokModel({
        name: ourwork.name,
        title: ourwork.title,
        review: ourwork.review,
        description: ourwork.description,
        websiteLink: ourwork.websiteLink,
        siteimages: imageurl,
      });
  
      data.save();
      return { formData: data };
    }
  
    async deleteBlogs(blogId: string) {
      const blogdelete = await this.ourwokModel.findByIdAndDelete(blogId);
      return ' ourworks deleted succesfully' + blogdelete;
    }
    findAllBlogs() {
      const ourworks = this.ourwokModel.find();
      return ourworks;
      // return "get all ourworks succesfully"
    }
  
    async findBlogsbyId(blogId: any) {
      let findblog = await this.ourwokModel.findById(blogId);
      if (!findblog) {
        throw new NotFoundException(`Item with ID ${blogId} not found`);
      } else {
        return findblog;
      }
      // return 'ourwork find by id succesfully ' + params;
    }
  
    async updateBlogs(blogId: any, ourwork: any) {
      let updatedblog = await this.ourwokModel.findByIdAndUpdate(blogId, ourwork, {
        timestamps: true,
      });
      console.log(updatedblog, ourwork);
      // this.blogArray[index] = ourwork;
      updatedblog.save();
      return ` ourworks updated succesfully res ${updatedblog}`;
    }
  }
  