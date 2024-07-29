import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
  Put,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OfficeService } from 'src/offices/offices.service';
import { CreateOfficesDto, UpdateOfficeDto } from './offices.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('offices')
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all offices with pagination' })
  getAllOffices(@Query('page') page: number, @Query('limit') limit: number) {
    return this.officeService.getAllOffices(Number(page), Number(limit));
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Add seed offices' })
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get office by ID' })
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new office' })
  @UseInterceptors(FileInterceptor('file'))
  createOffice(
    @Body() office: CreateOfficesDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // 2MB
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
    return this.officeService.createOffice(office, file);
  }

  @Put(':id')
  updateOffices(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() office: UpdateOfficeDto,
  ) {
    return this.officeService.updateOffice(office, id);
  }

  @ApiOperation({ summary: 'Delete an office' })
  @Delete(':id')
  deleteOffice(@Param('id', ParseUUIDPipe) id: string) {
    return this.officeService.deleteOffice(id);
  }
}

 