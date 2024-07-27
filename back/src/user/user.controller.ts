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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

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
