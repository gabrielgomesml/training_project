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

    @ManyToOne(() => Movies, movie => movie.movies_users, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'movie_id' })
    movie: Movies;

    @ManyToOne(() => Users, user => user.movies_users, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn()
    created_at: Date;
}

export default MoviesUsers;
