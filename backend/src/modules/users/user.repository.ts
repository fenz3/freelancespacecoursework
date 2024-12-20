import { PrismaClient } from '@prisma/client';
import { SignUpRequestDTO, UserDTO, UserPatchRequestDTO } from './user.model';
import { BaseRepository } from '~/libs/core/base-repository';

class UserRepository extends BaseRepository<
  UserDTO,
  UserDTO[],
  SignUpRequestDTO,
  UserPatchRequestDTO
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }

  public async findByEmail(email: string): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

export { UserRepository };
