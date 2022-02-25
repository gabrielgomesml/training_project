import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import GenresMovies from './GenresMovies';

@Entity('genres')
class Genres {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @OneToMany(() => GenresMovies, genres_movies => genres_movies.genre)
    genres_movies: GenresMovies[];

    @CreateDateColumn()
    createdAt: Date;
}

export default Genres;
