import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;
}

export default Users;
