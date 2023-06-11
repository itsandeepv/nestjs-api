import { HttpStatus, Injectable, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blogs, BlogsModel } from './blogs.modal';
import { FileInterceptor ,FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { multerConfig } from './multer-config';

@Injectable()
export class BlogsProvider {
  // public blogArray: Blogs[] = [];

  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blogs>) {}
  @UseInterceptors(FileInterceptor('image' ,multerConfig))
  async addBlogs(blog: {
    title: string;
    description: string;
    author: string;
    published: string;
    content: string;
    image: string;
  }  ,  file) {
    // const blogSave = await new this.blogModel(blog);
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;    
    const data = await new this.blogModel({
      title: blog.title,
      description: blog.description,
      author: blog.author,
      published: blog.published,
      content: blog.content,
      image: imageUrl,
    });

    data.save();
    
    console.log(data  ,file , "<<<<<<");
    return { formData: data };
  
    // blogSave.save();
    // return res.status(HttpStatus.OK).json({
    //   status : true,
    //   fileurl : blogSave
    // })
    
  }

  async deleteBlogs(blogId: string) {
    const blogdelete = await this.blogModel.findByIdAndDelete(blogId);
    return ' blogs deleted succesfully' + blogdelete;
  }
   findAllBlogs() {
    const blogs =  this.blogModel.find();
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
