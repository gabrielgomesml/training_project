import GenresMoviesRepository from '@repositories/GenresMoviesRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

class GenresMoviesController {
    async create(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const genreMovie = await genresMoviesRepository.createGenreMovie(
                request.body,
            );

            if (!genreMovie) {
                return response.status(400).json({ error: 'Incorrect params' });
            }

            return response.status(201).json(genreMovie);
        } catch (error) {
            return error;
        }
    }

    async read(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const { id } = request.params;

            const genreMovie = await genresMoviesRepository.findGenreMovieById(
                id,
            );

            if (genreMovie === null) {
                return response
                    .status(404)
                    .json({ message: 'Genre-movie relation not found' });
            }

            if (genreMovie === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(genreMovie);
        } catch (error) {
            return error;
        }
    }

    async update(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const { id } = request.params;

            const updatedGenreMovie =
                await genresMoviesRepository.updateGenreMovieById(
                    id,
                    request.body,
                );

            if (updatedGenreMovie === null) {
                return response
                    .status(404)
                    .json({ message: 'Genre-movie relation not found' });
            }

            if (updatedGenreMovie === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(updatedGenreMovie);
        } catch (error) {
            return error;
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const { id } = request.params;

            const genreMovie =
                await genresMoviesRepository.deleteGenreMovieById(id);

            if (genreMovie?.affected === 0) {
                return response
                    .status(404)
                    .json({ message: 'Genre-movie relation not found' });
            }

            if (genreMovie?.affected === 1) {
                return response.status(200).json({
                    message: 'Genre-movie relation successfully deleted',
                });
            }

            return response.status(400).json({ message: 'Incorrect params' });
        } catch (error) {
            return error;
        }
    }

    async list(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const genresMovies =
                await genresMoviesRepository.listGenresMovies();

            if (genresMovies === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(genresMovies);
        } catch (error) {
            return error;
        }
    }

    async listByGenreId(request: Request, response: Response) {
        try {
            const genresMoviesRepository = getCustomRepository(
                GenresMoviesRepository,
            );

            const { id } = request.params;

            const genresMovies =
                await genresMoviesRepository.findGenresMoviesByUserId(id);

            if (genresMovies === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(genresMovies);
        } catch (error) {
            return error;
        }
    }
}

export default new GenresMoviesController();
