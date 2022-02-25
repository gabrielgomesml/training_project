import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@repositories/UsersRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthController {
    async authenticateUser(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const { email, password } = request.body;

            const user = await usersRepository.findUserByEmail(email);

            if (user === null) {
                return response.status(404).json({ error: 'User not found' });
            }

            if (user.active === false) {
                return response.status(403).json({ error: 'Bloked user' });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password,
            );

            if (!isPasswordCorrect) {
                return response.status(401).json({ message: 'Wrong password' });
            }

            if (!process.env.JWT_SECRET) {
                return response.status(500).json({ message: 'Server error' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '10h',
            });

            return response.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    photo_address: user.photo_address,
                    phone: user.phone,
                    role: user.role,
                    active: user.active,
                },
                token,
            });
        } catch (error) {
            return error;
        }
    }

    async verifyToken(request: Request, response: Response) {
        const authHeader = request.headers.authorization;
        try {
            if (!process.env.JWT_SECRET || !authHeader) {
                return response.status(500).json({ message: 'Server error' });
            }
            const [, token] = authHeader.split(' ');

            jwt.verify(token.replace(/["]+/g, ''), process.env.JWT_SECRET);

            return response
                .status(200)
                .json({ message: 'Correct token', authHeader });
        } catch (error) {
            console.log(' erro', error);
            return response
                .status(401)
                .json({ message: 'Incorrect token', authHeader });
        }
    }
}

export default new AuthController();
