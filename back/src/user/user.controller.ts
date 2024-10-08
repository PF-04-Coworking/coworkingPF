import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  contactInfoDto,
  CreateUserDto,
  GoogleAccessTokenDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { AddNewReservationDto } from 'src/reservations/reservations.dto';
import { UserRole } from './user-role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/entities/Users.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { PaymentsService } from 'src/payments/payments.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reservationsService: ReservationsService,
    private readonly stripeService: PaymentsService,
  ) {}

  //*GET

  //!solo admin
  @Get('all')
  @ApiOperation({ summary: 'Get all users / Admin only' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('search') search?: string) {
    return this.userService.getUsers(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID  / Admin only' })
  @ApiResponse({ status: 200, description: 'User data', type: User })
  @ApiBearerAuth()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  //* ruta para que un user loggeado vea sus reservaciones
  @Get(':id/reservations')
  @ApiOperation({ summary: 'Get reservations by user ID (User only)' })
  @ApiResponse({
    status: 200,
    description: 'List of user reservations',
  })
  @ApiBearerAuth()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getReservationsByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservationsService.getReservationsByUserId(id);
  }

  //* ruta para que un user loggeado cree una nueva reservación
  @Post(':id/reservations/new')
  @ApiOperation({ summary: 'Add a new reservation (User only)' })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. User can only add reservations for their own ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @ApiBearerAuth()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async addNewReservation(
    @Param('id', ParseUUIDPipe) paramId: string,
    @Body() data: AddNewReservationDto,
  ) {
    try {
      // Process the payment with Stripe
      const paymentIntent = await this.stripeService.createPaymentIntent(
        data.amount,
        'usd',
      );

      // Add the reservation
      const newReservation = await this.reservationsService.addNewReservation(
        paramId,
        data,
      );

      return {
        statusCode: 201,
        message: 'The reservation has been successfully created.',
        data: newReservation,
        clientSecret: paymentIntent.client_secret, // Return client secret to complete the payment on the frontend
      };
    } catch (error) {
      console.error('Error in addNewReservation:', error);

      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  //*POST
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  //*PUT
  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID / User' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiBearerAuth()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  //*LOGIN Y REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  login(@Body() credentials: LoginUserDto) {
    return this.userService.login(credentials);
  }

  @Post('google/register')
  @ApiOperation({ summary: 'Register a user with Google authentication' })
  @ApiResponse({
    status: 201,
    description: 'User registered with Google successfully',
  })
  registerGoogle(@Body() credentials: GoogleAccessTokenDto) {
    return this.userService.registerGoogle(credentials);
  }

  @Post('google/login')
  @ApiOperation({ summary: 'Login a user with Google authentication' })
  @ApiResponse({
    status: 200,
    description: 'User logged in with Google successfully',
  })
  loginGoogle(@Body() credentials: GoogleAccessTokenDto) {
    return this.userService.loginGoogle(credentials);
  }

  @Post('contact/form')
  @ApiOperation({ summary: 'Submit contact information' })
  @ApiResponse({
    status: 200,
    description: 'Contact information submitted successfully',
  })
  contactInfo(@Body() contactInfo: contactInfoDto) {
    return this.userService.contactInfo(contactInfo);
  }

  @Put('activate/:id')
  @ApiOperation({ summary: 'Deactivate / ADMIN only' })
  @ApiResponse({ status: 200, description: 'User successfully deactivated'})
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  activateUser(@Param('id') id: string){
    return this.userService.activateUser(id)
  }

  @Put('deactivate/:id')
  @ApiOperation({ summary: 'Activate user / ADMIN only' })
  @ApiResponse({ status: 200, description: 'User successfully activated'})
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deactivateUser(@Param('id') id: string){
    return this.userService.deactivateUser(id);
  }
}
