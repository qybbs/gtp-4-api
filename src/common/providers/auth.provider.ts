import { AuthGuard } from 'src/common/guards/auth.guard';

export const AuthProvider = {
  provide: 'APP_GUARD',
  useClass: AuthGuard,
};
