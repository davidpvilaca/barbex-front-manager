import { IUser } from './user.interface';

export interface IUserClaims {
  user: IUser;
  token: string;
}

export interface ISignupBody {
  name: string;
  email: string;
  password: string;
}
