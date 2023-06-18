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
import { compare, genSalt, hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../blogs/multer-config';
import { ConfigService } from '@nestjs/config';
const cloudinary = require('cloudinary');
import { CloudinaryService } from 'src/cloundanery/cloudinary.service';
import { Users } from './users.modal';
const jwt = require('jsonwebtoken');
@Injectable()
export class UsersProvider {
  private readonly cloudinaryService: CloudinaryService;

  constructor(@InjectModel('User') private readonly userModel: Model<Users>) {}
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addusers(
    user: {
      fname: string;
      lname: string;
      email: string;
      password: string;
      role: string;
      address: string;
      image: [];
    },
    file,
  ) {
    const finduser = await this.userModel.findOne({ email: user.email });
    if (finduser) {
      throw new NotFoundException(`This email is already exist !`);
    }

    const imageurl = [];
    if (file?.path) {
      await cloudinary.uploader.upload(file?.path, (res, error) => {
        imageurl.push({
          asset_id: res.asset_id,
          url: res?.secure_url,
        });
      });
    }

    const saltOrRounds = 10;
    if (user.password) {
      var hashpassword = await bcrypt.hash(user.password, saltOrRounds);
    } else {
      throw new NotFoundException(`Password is Required !`);
    }
    console.log(hashpassword, '<<<<<<<<');

    const data = new this.userModel({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: hashpassword,
      address: user.address,
      role: user.role,
      image: imageurl,
    });

    await data.save();

    return { formData: data };
  }
  async addadmin(
    user: {
      fname: string;
      lname: string;
      email: string;
      password: string;
      role: string;
      address: string;
      image: [];
    },
    file,
  ) {
    const finduser = await this.userModel.findOne({ email: user.email });
    if (finduser) {
      throw new NotFoundException(`This email is already exist !`);
    }

    const imageurl = [];
    if (file?.path) {
      await cloudinary.uploader.upload(file?.path, (res, error) => {
        imageurl.push({
          asset_id: res.asset_id,
          url: res?.secure_url,
        });
      });
    }

    const saltOrRounds = 10;
    if (user.password) {
      var hashpassword = await bcrypt.hash(user.password, saltOrRounds);
    } else {
      throw new NotFoundException(`Password is Required !`);
    }
    console.log(hashpassword, '<<<<<<<<');

    const data = new this.userModel({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: hashpassword,
      address: user.address,
      role: user.role,
      image: imageurl,
    });

    await data.save();

    return { formData: data };
  }

  async loginUser(user: { email: string; password: string }) {
    const finduser = await this.userModel.findOne({ email: user.email });
    if (finduser) {
      const saltOrRounds = 10;
      const hashpasshed = await bcrypt.hash(user.password, saltOrRounds);
      const isMatch = await compare(user.password, finduser.password);

      console.log(finduser, user, isMatch, finduser.password);

      if (isMatch) {
        // return ' user find/ succesfully isMatch' + finduser.password ;
        let token = jwt.sign({ id: finduser.id }, 'SandeepIsTheKey', {
          expiresIn: '1d',
        });
        return {
          data: {
            status: true,
            message: 'user log in success ',
            token: token,
            finduser,
          },
        };
      } else {
        throw new NotFoundException(`Your Password is wrong !`);
      }
    } else {
      throw new NotFoundException(
        `Registered Email is not found please check email and password !`,
      );
    }
  }

  async deleteUser(userId: string) {
    const blogdelete = await this.userModel.findByIdAndDelete(userId);
    return ' blogs deleted succesfully' + blogdelete;
  }
  findAlluser() {
    const users = this.userModel.find();
    return users;
    // return "get all users succesfully"
  }

  async findUsersbyId(userId: any) {
    let finduser = await this.userModel.findById(userId);
    if (!finduser) {
      throw new NotFoundException(`Item with ID ${userId} not found`);
    } else {
      return finduser;
    }
    // return 'blog find by id succesfully ' + params;
  }

  async updateUsers(userId: any, user: any) {
    let updateduser = await this.userModel.findByIdAndUpdate(userId, user, {
      timestamps: true,
    });

    updateduser.save();
    return ` users updated succesfully res ${updateduser}`;
  }
}
