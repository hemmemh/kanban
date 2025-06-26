import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '../auth/types/accessToken';
import { UserSchema } from 'src/schemas/user.schema';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserSchema)
    private UserRepo: Repository<UserSchema>,
  ) {}

  getUserByEmail(email: string) {
    return this.UserRepo.findOne({ where: { email } });
  }

  async create(user: LoginDTO) {
    try {
      return this.UserRepo.save(user);
    } catch (error) {
      throw new BadRequestException('Не удалось создать пользователя: ' + error.error.mesage)
    }
    
  }

  async validateUser(email: string): Promise<UserSchema> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async login(dto: LoginDTO): Promise<AccessToken> {
    const user = await this.getUserByEmail(dto.email);
    if (!user) {
       throw new NotFoundException('Пользователь не найден');
    }
    const isMatch: boolean = bcrypt.compareSync(dto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Пароль не подходит');
    }
    return this.verify(user);
  }

  async logout(res: any) {
    try {
      return res.status(200).send({ message: 'Successfully logged out' });
    } catch (error) {
      throw new BadRequestException('Не удалось выйти: ' + error.error.message);
    }
  }

  async delete(id: string) {
    try {
      return this.UserRepo.delete(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить пользователя');
    }
  }

  async verify(user: UserSchema): Promise<AccessToken> {
    const payload = { email: user.email, uid: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(user: LoginDTO): Promise<AccessToken> {
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Пользователь с данным имейлом уже создан');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.create({ ...user, password: hashedPassword });
    return this.verify(newUser);
  }

  async getByID(id:number){
        const response =  await this.UserRepo.findOne({where:{id}})
        return response
  }

  async getProfile(user: UserSchema) {
    const profile = await this.validateUser(user.email);
    return profile;
  }
}
