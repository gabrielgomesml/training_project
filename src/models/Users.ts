import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import MoviesUsers from './MoviesUsers';

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text')
    name: string;

    @Column('text')
    surname: string;

    @Column('text', { nullable: true })
    photo_address: string;

    @Column('text', { nullable: true })
    phone: string;

    @Column('int')
    role: number;

    @Column('boolean', { default: true })
    active: boolean;

    @OneToMany(() => MoviesUsers, movies_users => movies_users.user)
    movies_users: MoviesUsers[];

    @CreateDateColumn()
    createdAt: Date;
}

export default Users;
