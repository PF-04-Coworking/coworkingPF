import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/Users.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID.', type: User })
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: User })
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: User) {
    return this.userService.updateUser(id, user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'The user has been successfully signed up.', type: User })
  signUp(@Body() user: User) {
    return this.userService.signUp(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'The user has been successfully signed in.' })
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.signIn(email, password);
  }
}

