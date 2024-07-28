import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/user-role.enum';

export const Roles = (...roles: UserRole[]) => {
  return SetMetadata('roles', roles);
};
