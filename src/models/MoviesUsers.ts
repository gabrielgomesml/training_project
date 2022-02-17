import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Movies from './Movies';
import Users from './Users';

@Entity('movies_users')
class MoviesUsers {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    movie_id: string;

    @Column('uuid')
    user_id: string;

    @ManyToOne(() => Movies, movie => movie.movies_users)
    @JoinColumn({ name: 'movie_id' })
    movie: Movies;

    @ManyToOne(() => Users, user => user.movies_users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn()
    created_at: Date;
}

export default MoviesUsers;
