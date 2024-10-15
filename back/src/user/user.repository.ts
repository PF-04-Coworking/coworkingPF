import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/Users.entity';
import { Brackets, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  GoogleAccessTokenDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';
import axios from 'axios';
import { NodeMailerRepository } from 'src/node-mailer/node-mailer.repository';
import { Reservation } from 'src/entities/Reservations.entity';
import { domainToUnicode } from 'url';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly nodeMailerRepository: NodeMailerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(search?: string) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.reservations', 'reservations')
      .select([
        'user.id',
        'user.name',
        'user.lastname',
        'user.email',
        'user.phone',
        'user.country',
        'user.city',
        'user.age',
        'user.role',
        'user.imgUrl',
        'user.is_active',
        'reservations',
      ]);

    if (search) {
      const searchTerms = search.split(' ').map((term) => term.toLowerCase());

      query.where('LOWER(user.email) LIKE :email', {
        email: `%${searchTerms.join(' ')}%`,
      });

      if (searchTerms.length > 1) {
        query.orWhere(
          new Brackets((qb) => {
            qb.where('LOWER(user.name) LIKE :name', {
              name: `%${searchTerms[0]}%`,
            }).andWhere('LOWER(user.lastname) LIKE :lastname', {
              lastname: `%${searchTerms[1]}%`,
            });
          }),
        );
      } else {
        query.orWhere(
          new Brackets((qb) => {
            qb.where('LOWER(user.name) LIKE :name', {
              name: `%${searchTerms[0]}%`,
            }).orWhere('LOWER(user.lastname) LIKE :lastname', {
              lastname: `%${searchTerms[0]}%`,
            });
          }),
        );
      }
    }

    return await query.getMany();
  }

  async getuserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['reservations', 'reservations.office'],
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

    const dbUser = await this.userRepository.findOneBy({
      email: foundUser.email,
    });

    const { password: _, ...userNoPassword } = dbUser;

    return userNoPassword;
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

    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.createUser({ ...user, password: hashedPassword });

    const { password: _, ...userNoPassword } = user;

    //nodeMailer envía mail de registro
    await this.nodeMailerRepository.registerEmail(userNoPassword);

    return userNoPassword;
  }

  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }

    if (user.is_active === false)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    const { password: _, ...userNoPassword } = user;

    return {
      message: `Successfully signed in. Welcome ${user.name}`,
      token,
      userNoPassword,
    };
  }

  async registerGoogle(credentials: GoogleAccessTokenDto) {
    const { accessToken } = credentials;

    // Verify the access token using AuthService
    let googleUserData: any;

    try {
      googleUserData = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Error fetching user info');
    }

    const foundUser = await this.userRepository.findOne({
      where: { email: googleUserData.data.email },
    });

    if (foundUser)
      throw new BadRequestException(
        `Email ${googleUserData.data.email} is already a registered account`,
      );

    const newUser = await this.userRepository.save({
      name: googleUserData.data.given_name,
      lastname: googleUserData.data.family_name,
      email: googleUserData.data.email,
    });

    const { password: _, ...userNoPassword } = newUser;

    //nodeMailer envía email de registro
    await this.nodeMailerRepository.registerEmail(userNoPassword);

    return userNoPassword;
  }

  async loginGoogle(credentials: GoogleAccessTokenDto) {
    const { accessToken } = credentials;

    // Verify the access token using AuthService
    let googleUserData: any;

    try {
      googleUserData = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Error fetching user info');
    }

    const user = await this.userRepository.findOne({
      where: { email: googleUserData.data.email },
    });

    if (!user) throw new BadRequestException('Wrong credentials');

    if (user.is_active === false)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      sub: user.id,
    };

    const token = this.jwtService.sign(tokenPayload);

    const { password: _, ...userNoPassword } = user;

    return {
      message: `Successfully signed in. Welcome ${user.name}`,
      token,
      user: userNoPassword,
    };
  }

  async deactivateUser(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id '${id}' was not found`);

    if (foundUser.is_active === false) return `User is already deactivated`;

    await this.userRepository.update(id, { is_active: false });

    const dbUser = await this.userRepository.findOneBy({ id });

    const { password: _, ...user } = dbUser;

    return {
      message: 'User was successfully deactivated',
      user,
    };
  }

  async activateUser(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id '${id}' was not found`);

    if (foundUser.is_active === true) return `User is already active`;

    await this.userRepository.update(id, { is_active: true });

    const dbUser = await this.userRepository.findOneBy({ id });

    const { password: _, ...user } = dbUser;

    return {
      message: 'User was successfully activated',
      user,
    };
  }
}

