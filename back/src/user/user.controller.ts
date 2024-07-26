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
import { User } from 'src/entities/Users.entity';

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
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: User) {
    return this.userService.updateUser(id, user);
  }

  @Post('signup')
  signUp(@Body() user: User) {
    return this.userService.signUp(user);
  }
  @Post('signin')
  signIn(@Body() email: string, password: string) {
    return this.userService.signIn(email, password);
  }
}
