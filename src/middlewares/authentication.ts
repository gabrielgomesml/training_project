import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class Authentication {
    async authenticate(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response
                .status(401)
                .json({ message: 'You are not authenticated' });
        }

        const [, token] = authHeader.split(' ');

        try {
            if (!process.env.JWT_SECRET) {
                return response.status(500).json({ message: 'Server error' });
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET);

            request.payload = payload;

            return next();
        } catch (error) {
            return response.status(401).json({ message: 'Incorrect token' });
        }
    }
}

export default new Authentication();
