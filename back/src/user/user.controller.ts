import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { AddNewReservationDto } from 'src/reservations/reservations.dto';
import { UserRole } from './user-role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaymentsService } from 'src/payments/payments.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reservationsService: ReservationsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  //*GET

  //!solo admin
  @Get('all')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiBearerAuth()
 // @Roles(UserRole.ADMIN)
  //@UseGuards(AuthGuard, RolesGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  //* ruta para que un user loggeado vea sus reservaciones
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id/reservations')
  @ApiOperation({ summary: 'Get reservations by user ID (User only)' })
  getReservationsByUserId(@Param('id') id: string) {
    return this.reservationsService.getReservationsByUserId(id);
  }

  //* ruta para que un user loggeado cree una nueva reservación
  //@Roles(UserRole.USER)
  //@UseGuards(AuthGuard, RolesGuard)
  @Post(':id/reservations/new')
  @ApiOperation({ summary: 'Add a new reservation (User only)' })
  async addNewReservation(
    @Param('id') id: string,
    @Body() data: AddNewReservationDto,
  ) {
    // Crea la reserva en la base de datos
    const newReservation = await this.reservationsService.addNewReservation(id, data);

    // Crear un Payment Intent con Stripe para la reserva
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      data.amount,  // Cantidad a pagar
      'usd'  // Moneda (puedes adaptarlo según tus necesidades)
    );

    return {
      reservation: newReservation,
      paymentIntent,
    };
  }

  //*POST
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  //*PUT
  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  //*LOGIN Y REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  login(@Body() credentials: LoginUserDto) {
    //{ email: 'prueba2@mail.com', password: '123' }
    return this.userService.login(credentials);
  }
}
