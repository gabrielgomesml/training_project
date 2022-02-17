import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenresMigration1642766003606 implements MigrationInterface {
    name = 'CreateGenresMigration1642766003606';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "genres"`);
    }
}
