import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genres')
class Genres {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;
}

export default Genres;
