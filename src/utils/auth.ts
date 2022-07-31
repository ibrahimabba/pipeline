/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import { env } from './env';
import { addSeconds } from 'date-fns';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isPasswordSame = (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

export const generateJWT = (
  payload: { [key: string]: any },
  expiry = 604800,
) => {
  const token = jwt.sign(payload, env('JWT_SECRET'), {
    expiresIn: expiry,
    issuer: 'Pipeline',
  });
  return {
    expiry: addSeconds(new Date(), Number(expiry)),
    token,
  };
};

export const validateJWTToken = (authorization: string): any => {
  const [, token] = authorization?.split('Bearer ');

  return jwt.verify(token, env('JWT_SECRET'));
};
