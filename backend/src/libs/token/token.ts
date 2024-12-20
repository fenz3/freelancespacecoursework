import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

export class Token {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  createToken(payload: object, expiresIn: string | number = '24h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): {
    valid: boolean;
    payload?: JwtPayload | string;
    error?: string;
  } {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }
}

export const token = new Token(config.secretKey);
