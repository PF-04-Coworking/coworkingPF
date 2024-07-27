import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getuserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return user;
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.save(user);

    const dbUser = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: { reservations: true },
    });

    return dbUser;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    await this.userRepository.update(id, user);

    return user;
  }

  async deleteById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    await this.userRepository.remove(user);
    return `User with id ${id} was deleted successfully`;
  }

  async register(user: CreateUserDto) {
    const { email, password } = user;

    const foundUser = await this.userRepository.findOne({ where: { email } });

    if (foundUser)
      throw new BadRequestException(
        `Email ${email} is already a registered account`,
      );
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;

    console.log('Login function called'); // Añadido

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      console.log('User not found'); // Añadido
      throw new BadRequestException('Wrong credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password'); // Añadido
      throw new BadRequestException('Wrong credentials');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Agregamos el console.log para verificar el secretOrPrivateKey
    console.log('JWT_SECRET en login method:', process.env.JWT_SECRET); // Añadido

    const token = this.jwtService.sign(payload);

    console.log('Token generated:', token); // Añadido

    return { message: `Successfully signed in. Welcome ${user.name}`, token };
  }
}
