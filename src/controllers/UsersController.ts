import UsersRepository from '@repositories/UsersRepository';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

class UsersController {
    async create(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const { email, password, ...data } = request.body;

            const userAlreadyExists = await usersRepository.findUserByEmail(
                email,
            );

            if (userAlreadyExists === null) {
                return response
                    .status(400)
                    .json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            let user;

            if (hashedPassword) {
                user = await usersRepository.createUser({
                    password: hashedPassword,
                    email,
                    ...data,
                });
            }

            if (!user) {
                return response.status(400).json({ error: 'Incorrect params' });
            }

            return response.status(201).json(user);
        } catch (error) {
            console.log('erro: ', error);
            return error;
        }
    }

    async read(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const { id } = request.params;

            const user = await usersRepository.findUserById(id);

            if (user === null) {
                return response.status(404).json({ message: 'User not found' });
            }

            if (user === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(user);
        } catch (error) {
            return error;
        }
    }

    async update(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const { id } = request.params;

            const updatedUser = await usersRepository.updateUserById(
                id,
                request.body,
            );

            if (updatedUser === null) {
                return response.status(404).json({ message: 'User not found' });
            }

            if (updatedUser === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(updatedUser);
        } catch (error) {
            return error;
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const { id } = request.params;

            const user = await usersRepository.deleteUserById(id);

            if (user?.affected === 0) {
                return response.status(404).json({ message: 'User not fond' });
            }

            if (user?.affected === 1) {
                return response
                    .status(200)
                    .json({ message: 'User successfully deleted' });
            }

            return response.status(400).json({ message: 'Incorrect params' });
        } catch (error) {
            return error;
        }
    }

    async list(request: Request, response: Response) {
        // TO-DO: ADD REQUEST TO ALLOW PARAMS. PARAMS TO BE USED IN LIST USERS FUNCTION
        try {
            const usersRepository = getCustomRepository(UsersRepository);

            const users = await usersRepository.listUsers();

            if (users === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(users);
        } catch (error) {
            return error;
        }
    }
}

export default new UsersController();
