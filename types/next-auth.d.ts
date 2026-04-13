import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Address {
    id: string;
    type: string;
    address: string;
    userId: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      addresses?: Address[];
      phone?: string;
      rating?: number;
      vehicle?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    addresses?: Address[];
    phone?: string;
    rating?: number;
    vehicle?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
