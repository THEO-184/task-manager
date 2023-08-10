import { Request } from 'express';
import { TokenPayload } from 'src/auth/interfaces/tokenPayload.interface';

declare module 'express' {
  interface Request {
    user: TokenPayload;
  }
}
