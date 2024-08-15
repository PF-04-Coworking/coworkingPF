import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseUUIDPipe,
  Put,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OfficeService } from 'src/offices/offices.service';
import { CreateOfficesDto, UpdateOfficeDto } from './offices.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServicesEnum } from 'src/utils/services.enum';
import { LocationEnum } from 'src/utils/location.enum';
import { Office } from 'src/entities/Offices.entity';
import { UserRole } from 'src/user/user-role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('offices')
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  //* GET
  @Get()
  @ApiOperation({ summary: 'Get all offices with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'services',
    required: false,
    isArray: true,
    enum: ServicesEnum,
  })
  @ApiQuery({ name: 'capacity', required: false, type: Number })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'price', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of offices', type: [Office] })
  getAllOffices(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('services') services: ServicesEnum[] = [],
    @Query('capacity') capacity: number,
    @Query('location') location: LocationEnum,
    @Query('price') price: number,
  ) {
    return this.officeService.getAllOffices(page, limit, {
      services,
      capacity,
      location,
      price,
    });
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Add seed offices' })
  @ApiResponse({ status: 201, description: 'Seed offices added' })
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detailed view of each office' })
  @ApiResponse({ status: 200, description: 'The found office', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found' })
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }
  @Put('activate/:id')
  @ApiOperation({ summary: 'Activate office / ADMIN only' })
  @ApiResponse({ status: 200, description: 'Office set active'})
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  activateOffice(@Param('id') id: string){
    return this.officeService.activateOffice(id);
  }

  @Put('deactivate/:id')
  @ApiOperation({ summary: 'Deactivate office / ADMIN only' })
  @ApiResponse({ status: 200, description: 'Office set inactive'})
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deactivaeOffice(@Param('id') id: string){
    return this.officeService.deactivateOffice(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new office / Admin only' })
  @ApiResponse({ status: 201, description: 'The created office', type: Office })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
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
    console.log('office', office);
    console.log('file', file);
    return this.officeService.createOffice(office, file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an office / Admin only' })
  @ApiResponse({ status: 200, description: 'The updated office', type: Office })
  @ApiResponse({ status: 404, description: 'Office not found' })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  updateOffice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() office: UpdateOfficeDto,
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
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.officeService.updateOffice(id, office, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an office / Admin only' })
  @ApiResponse({ status: 200, description: 'The deleted office' })
  @ApiResponse({ status: 404, description: 'Office not found' })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteOffice(@Param('id', ParseUUIDPipe) id: string) {
    return this.officeService.deleteOffice(id);
  }
}
