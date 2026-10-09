import { DefaultSession } from '@clerk/nextjs/server';

declare module '@clerk/nextjs/server' {
  interface SessionClaims {
    publicMetadata?: {
      role?: 'USER' | 'PROVIDER' | 'ADMIN';
    };
  }
}

declare module '@clerk/nextjs' {
  interface CurrentUser {
    publicMetadata?: {
      role?: 'USER' | 'PROVIDER' | 'ADMIN';
    };
  }
}
