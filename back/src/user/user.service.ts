import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  contactInfoDto,
  CreateUserDto,
  GoogleAccessTokenDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';
import { transporter } from 'src/Config/mailer';

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

  async contactInfo(contactInfo: contactInfoDto){

    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: contactInfo.email, // list of receivers
        subject: 'Confirmacion de cuenta', // Subject line
        html: `<b>Hola, bienvenid@ ${contactInfo.name} a Relux!</b>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }

    return 'Contact email sent successfully'
  }
}