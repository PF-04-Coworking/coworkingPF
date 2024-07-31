import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadRepository: FileUploadService) {}

  @Post('uploadUserImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image for a user' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image successfully uploaded' })
  uploadUserImage(
    @Param('id') userId: string,
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
    return this.fileUploadRepository.uploadUserImage(file, userId);
  }

  @Post('uploadOfficeImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image for an office' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image successfully uploaded' })
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
