import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  contactInfoDto,
  CreateUserDto,
  GoogleAccessTokenDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';
import { NodeMailerRepository } from 'src/node-mailer/node-mailer.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository,
    private readonly nodeMailerRepository: NodeMailerRepository
  ) {}

  getUsers(search?: string) {
    return this.usersRepository.getUsers(search);
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

  async contactInfo(contactInfo: contactInfoDto) {

    await this.nodeMailerRepository.contactEmail(contactInfo);

    return 'Contact email sent successfully';
  }
}
