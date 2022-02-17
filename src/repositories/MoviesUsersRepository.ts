import { Repository, EntityRepository } from 'typeorm';
import MoviesUsers from '@models/MoviesUsers';
import { CreateMovieUserDTO, ResultMovieUserDTO } from '../dtos/moviesUsers';

interface MoviesUsersQueryParams {
    text: string;
}

@EntityRepository(MoviesUsers)
export default class MoviesUsersRespository extends Repository<MoviesUsers> {
    async createMovieUser(
        movieUser: CreateMovieUserDTO,
    ): Promise<ResultMovieUserDTO | boolean> {
        try {
            const result = this.create(movieUser);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async listMoviesUsers(): Promise<ResultMovieUserDTO[] | boolean> {
        try {
            const result = await this.find();

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findMovieUserById(
        id: string,
    ): Promise<ResultMovieUserDTO | null | boolean> {
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

    async findMoviesUsersByUserId(
        userId: string,
        params: MoviesUsersQueryParams,
    ): Promise<any | boolean> {
        try {
            const result = await this.createQueryBuilder('movies_users')
                .leftJoinAndSelect('movies_users.movie', 'movie')
                .where('movies_users.user_id = :userId', { userId });

            if (params.text && params.text !== '') {
                result.andWhere('movie.title ilike :movieTitle', {
                    movieTitle: `%${params.text}%`,
                });
            }

            const withSelections = await result.getMany();

            return withSelections;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateMovieUserById(
        id: string,
        movieUser: CreateMovieUserDTO,
    ): Promise<ResultMovieUserDTO | null | boolean> {
        try {
            await this.update(id, movieUser);

            const updatedMovieUser = await this.findOne(id);

            if (!updatedMovieUser) {
                return null;
            }

            return updatedMovieUser;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteMovieUserById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
