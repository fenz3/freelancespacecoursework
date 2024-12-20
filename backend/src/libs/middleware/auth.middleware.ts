import { Request, Response, NextFunction } from 'express';
import { token } from '../token/token';

interface UserPayload {
  id: string;
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header is missing' });
    return;
  }

  const jwtToken = authHeader.split(' ')[1];

  if (!jwtToken) {
    res.status(401).json({ error: 'Token is missing' });
    return;
  }

  const { valid, payload } = token.verifyToken(jwtToken);

  if (!valid) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  if (payload && typeof payload === 'object' && 'id' in payload) {
    req.user = { id: payload.id };
  } else {
    res.status(403).json({ error: 'Token payload is invalid' });
    return;
  }

  next();
};

export default authMiddleware;
export { AuthRequest };
