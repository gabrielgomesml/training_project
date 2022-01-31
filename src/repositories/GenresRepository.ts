import { Repository, EntityRepository } from 'typeorm';
import Genres from '@models/Genres';
import { CreateGenreDTO, ResultGenreDTO } from '../dtos/genres';

@EntityRepository(Genres)
export default class GenresRespository extends Repository<Genres> {
    async createGenre(
        genre: CreateGenreDTO,
    ): Promise<ResultGenreDTO | boolean> {
        try {
            const result = this.create(genre);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async listGenres(): Promise<ResultGenreDTO[] | boolean> {
        try {
            const result = await this.find();

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findGenreById(id: string): Promise<ResultGenreDTO | null | boolean> {
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

    async updateGenreById(
        id: string,
        genre: CreateGenreDTO,
    ): Promise<ResultGenreDTO | null | boolean> {
        try {
            await this.update(id, genre);

            const updatedGenre = await this.findOne(id);

            if (!updatedGenre) {
                return null;
            }

            return updatedGenre;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteGenreById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
