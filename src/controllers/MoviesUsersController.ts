import MoviesUsersRepository from '@repositories/MoviesUsersRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

class MoviesUsersController {
    async create(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const movieUser = await moviesUsersRepository.createMovieUser(
                request.body,
            );

            if (!movieUser) {
                return response.status(400).json({ error: 'Incorrect params' });
            }

            return response.status(201).json(movieUser);
        } catch (error) {
            return error;
        }
    }

    async read(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const { id } = request.params;

            const movieUser = await moviesUsersRepository.findMovieUserById(id);

            if (movieUser === null) {
                return response
                    .status(404)
                    .json({ message: 'Movie-user relation not found' });
            }

            if (movieUser === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(movieUser);
        } catch (error) {
            return error;
        }
    }

    async update(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const { id } = request.params;

            const updatedMovieUser =
                await moviesUsersRepository.updateMovieUserById(
                    id,
                    request.body,
                );

            if (updatedMovieUser === null) {
                return response
                    .status(404)
                    .json({ message: 'Movie-user relation not found' });
            }

            if (updatedMovieUser === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(updatedMovieUser);
        } catch (error) {
            return error;
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const { id } = request.params;

            const movieUser = await moviesUsersRepository.deleteMovieUserById(
                id,
            );

            if (movieUser?.affected === 0) {
                return response
                    .status(404)
                    .json({ message: 'Movie-user relation not found' });
            }

            if (movieUser?.affected === 1) {
                return response.status(200).json({
                    message: 'Movie-user relation successfully deleted',
                });
            }

            return response.status(400).json({ message: 'Incorrect params' });
        } catch (error) {
            return error;
        }
    }

    async list(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const moviesUsers = await moviesUsersRepository.listMoviesUsers();

            if (moviesUsers === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(moviesUsers);
        } catch (error) {
            return error;
        }
    }

    async listByUserId(request: Request, response: Response) {
        try {
            const moviesUsersRepository = getCustomRepository(
                MoviesUsersRepository,
            );

            const { id } = request.params;

            const moviesUsers =
                await moviesUsersRepository.findMoviesUsersByUserId(id);

            if (moviesUsers === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(moviesUsers);
        } catch (error) {
            return error;
        }
    }
}

export default new MoviesUsersController();
