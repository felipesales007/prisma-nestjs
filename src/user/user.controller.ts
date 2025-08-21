import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Req,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/multer-config';
import { Request } from 'express';
import { memoryStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async create(
    @Body() user: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (file) {
      user.photo = `${req.protocol}://${req.get('host')}/files/${
        file.filename
      }`;
    }
    return this.userService.create(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: memoryStorage(), // arquivo só em memória
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2MB
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
        fileIsRequired: false,
        exceptionFactory: (errors) => {
          // NestJS envia os erros em um array ou string, vamos normalizar
          const messages = Array.isArray(errors) ? errors : [errors];

          if (messages.some((msg) => msg.includes('size'))) {
            throw new BadRequestException('O arquivo deve ter no máximo 2MB.');
          }
          if (messages.some((msg) => msg.includes('.(png|jpg|jpeg)'))) {
            throw new BadRequestException(
              'Apenas arquivos PNG, JPG ou JPEG são permitidos.',
            );
          }

          throw new BadRequestException('Arquivo inválido.');
        },
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log(user);
    if (file) {
      user.photo = `${req.protocol}://${req.get('host')}/files/${
        file.originalname
      }`;
    }

    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
