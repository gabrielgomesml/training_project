import { Repository, EntityRepository } from 'typeorm';
import GenresMovies from '@models/GenresMovies';
import { CreateGenreMovieDTO, ResultGenreMovieDTO } from '../dtos/genresMovies';

@EntityRepository(GenresMovies)
export default class GenresMoviesRespository extends Repository<GenresMovies> {
    async createGenreMovie(
        genreMovie: CreateGenreMovieDTO,
    ): Promise<ResultGenreMovieDTO | boolean> {
        try {
            const result = this.create(genreMovie);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async listGenresMovies(): Promise<ResultGenreMovieDTO[] | boolean> {
        try {
            const result = await this.find();

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findGenreMovieById(
        id: string,
    ): Promise<ResultGenreMovieDTO | null | boolean> {
        try {
            const result = await this.findOne(id);

            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findGenresMoviesByUserId(
        genreId: string,
    ): Promise<GenresMovies[] | boolean> {
        try {
            const result = await this.createQueryBuilder('genres_movies')
                .leftJoinAndSelect('genres_movies.movie', 'movie')
                .where('genres_movies.genre_id = :genreId', { genreId });

            const withSelections = await result.getMany();

            return withSelections;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateGenreMovieById(
        id: string,
        genreMovie: CreateGenreMovieDTO,
    ): Promise<ResultGenreMovieDTO | null | boolean> {
        try {
            await this.update(id, genreMovie);

            const updatedGenreMovie = await this.findOne(id);

            if (!updatedGenreMovie) {
                return null;
            }

            return updatedGenreMovie;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteGenreMovieById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
