import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Movies from './Movies';
import Genres from './Genres';

@Entity('genres_movies')
class GenresMovies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    genre_id: string;

    @Column('uuid')
    movie_id: string;

    @ManyToOne(() => Genres, genre => genre.genres_movies)
    @JoinColumn({ name: 'genre_id' })
    genre: Genres;

    @ManyToOne(() => Movies, movie => movie.genres_movies)
    @JoinColumn({ name: 'movie_id' })
    movie: Movies;

    @CreateDateColumn()
    created_at: Date;
}

export default GenresMovies;
