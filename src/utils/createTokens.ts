import { sign } from 'jsonwebtoken';

export const createAccessToken = (userId: number, role: string) => {
  return sign({ userId, role }, 'accesstokensecret', { expiresIn: '15m' });
};

export const createRefreshToken = (userId: number, tokenVersion: number) => {
  return sign({ userId }, 'refreshtokensecret', { expiresIn: '7d' });
};
