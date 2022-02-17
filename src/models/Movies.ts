import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import MoviesUsers from './MoviesUsers';

@Entity('movies')
class Movies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    poster: string;

    @Column('text', { nullable: true })
    synopsis: string;

    @Column('text')
    release_year: string;

    @OneToMany(() => MoviesUsers, movies_users => movies_users.movie)
    movies_users: MoviesUsers[];

    @CreateDateColumn()
    createdAt: Date;
}

export default Movies;
