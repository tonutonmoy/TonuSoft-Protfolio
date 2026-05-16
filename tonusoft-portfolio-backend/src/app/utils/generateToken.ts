import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import ms from 'ms';

export const generateToken = (
  payload: { id: string; name: string; email: string; role: string },
  secret: Secret,
  expiresIn: string // ex: '1h', '30m', '15d'
): string => {
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: expiresIn as unknown as ms.StringValue,
  };

  return jwt.sign(payload, secret, signOptions);
};
