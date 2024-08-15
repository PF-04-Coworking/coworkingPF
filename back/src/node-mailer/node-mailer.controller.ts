import { Controller, Post, Body } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('NodeMailer')
@Controller('node-mailer')
export class NodeMailerController {
  constructor(private readonly nodeMailerService: NodeMailerService) {}

  @Post('register')
  @ApiOperation({ summary: 'Send registration email' })
  @ApiBody({
    description: 'Partial user data without password',
  })
  @ApiResponse({
    status: 201,
    description: 'Registration email sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  registerEmail(@Body() userNoPassword) {
    return this.nodeMailerService.registerEmail(userNoPassword);
  }

  @Post('contact')
  @ApiOperation({ summary: 'Send contact email' })
  @ApiBody({
    description: 'Contact information for the email',
  })
  @ApiResponse({
    status: 201,
    description: 'Contact email sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid contact information' })
  contactEmail(@Body() contactInfo) {
    return this.nodeMailerService.contactEmail(contactInfo);
  }

  @Post('success')
  @ApiOperation({ summary: 'Send success email' })
  @ApiBody({
    description: 'Office and user information along with additional data',
  })
  @ApiResponse({
    status: 201,
    description: 'Success email sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  successEmail(@Body() foundOffice, @Body() foundUser, @Body() data) {
    return this.nodeMailerService.successEmail(foundOffice, foundUser, data);
  }

  @Post('reservation')
  @ApiOperation({ summary: 'Send reservation email' })
  @ApiBody({
    description: 'Reservation details including start and end dates',
  })
  @ApiResponse({
    status: 201,
    description: 'Reservation email sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid reservation details' })
  reservationEmail(@Body() startDate, @Body() endDate, @Body() reservation) {
    return this.nodeMailerService.reservationEmail(
      startDate,
      endDate,
      reservation,
    );
  }
}

