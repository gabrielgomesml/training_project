import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;
}

export default Movies;
