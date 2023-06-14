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
import { Blogs, BlogsModel } from './blogs.modal';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { multerConfig } from './multer-config';
import { ConfigService } from '@nestjs/config';
// import v2 as cloudinary from 'cloudinary';
const cloudinary = require('cloudinary');
import { CloudinaryResponse } from 'src/cloundanery/cloud.res';
const streamifier = require('streamifier');

import { CloudinaryService } from 'src/cloundanery/cloudinary.service';

@Injectable()
export class BlogsProvider {
  private readonly cloudinaryService: CloudinaryService;

  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blogs>) {}
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addBlogs(
    blog: {
      title: string;
      description: string;
      author: string;
      published: string;
      content: string;
      image: [];
    },
    file,
  ) {
    const imageurl = [];
    await cloudinary.uploader.upload(file.path, (res, error) => {
      imageurl.push({
        asset_id: res.asset_id,
        url: res?.secure_url,
      });
    });
    const data = await new this.blogModel({
      title: blog.title,
      description: blog.description,
      author: blog.author,
      published: blog.published,
      content: blog.content,
      image: imageurl,
    });

    data.save();
    return { formData: data };
  }

  async deleteBlogs(blogId: string) {
    const blogdelete = await this.blogModel.findByIdAndDelete(blogId);
    return ' blogs deleted succesfully' + blogdelete;
  }
  findAllBlogs() {
    const blogs = this.blogModel.find();
    return blogs;
    // return "get all blogs succesfully"
  }

  async findBlogsbyId(blogId: any) {
    let findblog = await this.blogModel.findById(blogId);
    if (!findblog) {
      throw new NotFoundException(`Item with ID ${blogId} not found`);
    } else {
      return findblog;
    }
    // return 'blog find by id succesfully ' + params;
  }

  async updateBlogs(blogId: any, blog: any) {
    let updatedblog = await this.blogModel.findByIdAndUpdate(blogId, blog, {
      timestamps: true,
    });
    console.log(updatedblog, blog);
    // this.blogArray[index] = blog;
    updatedblog.save();
    return ` blogs updated succesfully res ${updatedblog}`;
  }
}
