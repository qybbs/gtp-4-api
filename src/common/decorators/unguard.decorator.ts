import { SetMetadata } from '@nestjs/common';

export const UNGUARD_KEY = 'unGuard';
export const Unguard = () => SetMetadata(UNGUARD_KEY, true);
