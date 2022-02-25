import MoviesRespository from '@repositories/MoviesRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

class MoviesController {
    async create(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRespository);

            const movie = await moviesRepository.createMovie(request.body);

            if (!movie) {
                return response.status(400).json({ error: 'Incorrect params' });
            }

            return response.status(201).json(movie);
        } catch (error) {
            return error;
        }
    }

    async read(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRespository);

            const { id } = request.params;

            const movie = await moviesRepository.findMovieById(id);

            if (movie === null) {
                return response
                    .status(404)
                    .json({ message: 'Movie not found' });
            }

            if (movie === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(movie);
        } catch (error) {
            return error;
        }
    }

    async update(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRespository);

            const { id } = request.params;

            const updatedMovie = await moviesRepository.updateMovieById(
                id,
                request.body,
            );

            if (updatedMovie === null) {
                return response
                    .status(404)
                    .json({ message: 'Movie not found' });
            }

            if (updatedMovie === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(updatedMovie);
        } catch (error) {
            return error;
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRespository);

            const { id } = request.params;

            const movie = await moviesRepository.deleteMovieById(id);

            if (movie?.affected === 0) {
                return response
                    .status(404)
                    .json({ message: 'Movie not found' });
            }

            if (movie?.affected === 1) {
                return response
                    .status(200)
                    .json({ message: 'Movie successfully deleted' });
            }

            return response.status(400).json({ message: 'Incorrect params' });
        } catch (error) {
            return error;
        }
    }

    async list(request: Request, response: Response) {
        try {
            const moviesRepository = getCustomRepository(MoviesRespository);

            const movies = await moviesRepository.listMovies();

            if (movies === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(movies);
        } catch (error) {
            return error;
        }
    }
}

export default new MoviesController();
