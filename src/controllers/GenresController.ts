import GenresRespository from '@repositories/GenresRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

class GenresController {
    async create(request: Request, response: Response) {
        try {
            const genresRepository = getCustomRepository(GenresRespository);

            const genre = await genresRepository.createGenre(request.body);

            if (!genre) {
                return response.status(400).json({ error: 'Incorrect params' });
            }

            return response.status(201).json(genre);
        } catch (error) {
            return error;
        }
    }

    async read(request: Request, response: Response) {
        try {
            const genresRepository = getCustomRepository(GenresRespository);

            const { id } = request.params;

            const genre = await genresRepository.findGenreById(id);

            if (genre === null) {
                return response
                    .status(404)
                    .json({ message: 'Genre not found' });
            }

            if (genre === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(genre);
        } catch (error) {
            return error;
        }
    }

    async update(request: Request, response: Response) {
        try {
            const genresRepository = getCustomRepository(GenresRespository);

            const { id } = request.params;

            const updatedGenre = await genresRepository.updateGenreById(
                id,
                request.body,
            );

            if (updatedGenre === null) {
                return response
                    .status(404)
                    .json({ message: 'Genre not found' });
            }

            if (updatedGenre === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(updatedGenre);
        } catch (error) {
            return error;
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const genresRepository = getCustomRepository(GenresRespository);

            const { id } = request.params;

            const genre = await genresRepository.deleteGenreById(id);

            if (genre?.affected === 0) {
                return response
                    .status(404)
                    .json({ message: 'Genre not found' });
            }

            if (genre?.affected === 1) {
                return response
                    .status(200)
                    .json({ message: 'Genre successfully deleted' });
            }

            return response.status(400).json({ message: 'Incorrect params' });
        } catch (error) {
            return error;
        }
    }

    async list(request: Request, response: Response) {
        try {
            const genresRepository = getCustomRepository(GenresRespository);

            const genres = await genresRepository.listGenres();

            if (genres === false) {
                return response
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return response.status(200).json(genres);
        } catch (error) {
            return error;
        }
    }
}

export default new GenresController();
