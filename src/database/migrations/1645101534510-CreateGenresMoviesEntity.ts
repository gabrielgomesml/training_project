import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenresMoviesEntity1645101534510
    implements MigrationInterface
{
    name = 'CreateGenresMoviesEntity1645101534510';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "genres_movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "genre_id" uuid NOT NULL, "movie_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_913efb266ff2d4a3ba215ceae7b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_b37700ac8354f6a279342a39c5d" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_b37700ac8354f6a279342a39c5d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76"`,
        );
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "genres_movies"`);
    }
}
