import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from 'src/user/user-role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadRepository: FileUploadService) {}

  @Post('uploadUserImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image for a user / User and Admin' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image successfully uploaded',
    schema: {
      example: {
        message: 'Image uploaded successfully',
        url: 'https://example.com/uploads/yourimage.jpg',
      },
    },
  })
  @ApiBearerAuth()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  uploadUserImage(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // 200 KB
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadRepository.uploadUserImage(file, userId);
  }

  @Post('uploadOfficeImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image for an office / Admin only' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, description: 'ID of the office' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image successfully uploaded',
    schema: {
      example: {
        message: 'Image uploaded successfully',
        url: 'https://example.com/uploads/officeimage.jpg',
      },
    },
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  uploadOfficeImage(
    @Param('id') officeId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadRepository.uploadOfficeImage(file, officeId);
  }
}

