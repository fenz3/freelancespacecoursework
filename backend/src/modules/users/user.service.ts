import { encryption } from '~/libs/encryption/encryption';
import { UserRepository } from './user.repository';
import { token } from '~/libs/token/token';
import prisma from '~/libs/prisma/prisma-client';
import { SignUpRequestDto, UserDto } from 'shared/src';

class UserService {
  private userRepository = new UserRepository(prisma);

  public async create(userPayload: SignUpRequestDto) {
    if ((await this.userRepository.findByEmail(userPayload.email))) {
      throw { status: 409, errors: 'This email is already registered' };
    }

    userPayload.password = await encryption.encrypt(userPayload.password);
    const user = await this.userRepository.create(userPayload);
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw { status: 403, errors: 'There is no user with this credentials' };
    }
    if (!(await encryption.compare(password, user.password))) {
      throw { status: 403, errors: 'Wrong email or password' };
    }
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async getById(id: string) {
    const user = await this.userRepository.find(id);
    return user ? this.selectUserFields(user) : null;
  }

  private selectUserFields(user: UserDto) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
  }
}

export { UserService };
