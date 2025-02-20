import { AuthGuard } from 'src/controllers/auth/auth.guard';

export const AuthProvider = {
  provide: 'APP_GUARD',
  useClass: AuthGuard,
};
