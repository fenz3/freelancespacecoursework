import { PrismaClient } from '@prisma/client';
import { SignUpRequestDto, UserDto } from 'shared/src';
import { BaseRepository } from '~/libs/core/base-repository';

class UserRepository extends BaseRepository<
  UserDto,
  SignUpRequestDto,
  Partial<SignUpRequestDto>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

export { UserRepository };
