import { Repository, EntityRepository } from 'typeorm';
import Movies from '@models/Movies';
import { CreateMovieDTO, ResultMovieDTO } from '../dtos/movies';

@EntityRepository(Movies)
export default class MoviesRespository extends Repository<Movies> {
    async createMovie(
        movie: CreateMovieDTO,
    ): Promise<ResultMovieDTO | boolean> {
        try {
            const result = this.create(movie);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async listMovies(): Promise<ResultMovieDTO[] | boolean> {
        try {
            const result = await this.find({ relations: ['genres_movies'] });

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findMovieById(id: string): Promise<ResultMovieDTO | null | boolean> {
        try {
            const result = await this.findOne(id, {
                relations: ['genres_movies'],
            });

            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateMovieById(
        id: string,
        movie: CreateMovieDTO,
    ): Promise<ResultMovieDTO | null | boolean> {
        try {
            await this.update(id, movie);

            const updatedMovie = await this.findOne(id);

            if (!updatedMovie) {
                return null;
            }

            return updatedMovie;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteMovieById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
