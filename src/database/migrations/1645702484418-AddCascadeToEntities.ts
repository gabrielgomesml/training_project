import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeToEntities1645702484418 implements MigrationInterface {
    name = 'AddCascadeToEntities1645702484418';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_abc9403a694dd745359de5daaec"`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_3682f26c701421276529a6cb24f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76"`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_b37700ac8354f6a279342a39c5d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_abc9403a694dd745359de5daaec" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_3682f26c701421276529a6cb24f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_b37700ac8354f6a279342a39c5d" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_b37700ac8354f6a279342a39c5d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" DROP CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76"`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_3682f26c701421276529a6cb24f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_abc9403a694dd745359de5daaec"`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_b37700ac8354f6a279342a39c5d" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "genres_movies" ADD CONSTRAINT "FK_6f1ae27fb1fae4290e7242fbf76" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_3682f26c701421276529a6cb24f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_abc9403a694dd745359de5daaec" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
