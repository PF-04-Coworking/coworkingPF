import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CreateUserDto,
  GoogleAccessTokenDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getuserById(id);
  }

  createUser(user: CreateUserDto) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: UpdateUserDto) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteById(id: string) {
    return this.usersRepository.deleteById(id);
  }

  register(user: CreateUserDto) {
    return this.usersRepository.register(user);
  }

  login(credentials: LoginUserDto) {
    return this.usersRepository.login(credentials);
  }

  registerGoogle(credentials: GoogleAccessTokenDto) {
    return this.usersRepository.registerGoogle(credentials);
  }

  loginGoogle(credentials: GoogleAccessTokenDto) {
    return this.usersRepository.loginGoogle(credentials);
  }
}

