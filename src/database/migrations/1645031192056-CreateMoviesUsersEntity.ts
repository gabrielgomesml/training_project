import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesUsersEntity1645031192056
    implements MigrationInterface
{
    name = 'CreateMoviesUsersEntity1645031192056';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "movies_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee415b8c371d9d4c3a5306236e0" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_abc9403a694dd745359de5daaec" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" ADD CONSTRAINT "FK_3682f26c701421276529a6cb24f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_3682f26c701421276529a6cb24f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "movies_users" DROP CONSTRAINT "FK_abc9403a694dd745359de5daaec"`,
        );
        await queryRunner.query(`DROP TABLE "movies_users"`);
    }
}
