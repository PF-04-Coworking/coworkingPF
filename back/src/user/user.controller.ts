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
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { ReservationsService } from 'src/reservations/reservations.service';
import { AddNewReservationDto } from 'src/reservations/reservations.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reservationsService: ReservationsService,
  ) {}

  //*GET

  //!solo admin
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  //* ruta para que un user loggeado vea sus reservaciones
  // @Roles(Roles.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get(':id/reservations')
  getReservationsByUserId(@Param('id') id: string) {
    return this.reservationsService.getReservationsByUserId(id);
  }

  //* ruta para que un user loggeado cree una nueva reservación
  // @Roles(Roles.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  @Post(':id/reservations/new')
  addNewReservation(
    @Param('id') id: string,
    @Body() data: AddNewReservationDto,
  ) {
    const newReservation = this.reservationsService.addNewReservation(id, data);

    return newReservation;
  }

  //*POST
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  //*PUT
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  //*LOGIN Y REGISTER
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }
  @Post('login')
  login(@Body() credentials: LoginUserDto) {
    //{ email: 'prueba2@mail.com', password: '123' }
    return this.userService.login(credentials);
  }
}
