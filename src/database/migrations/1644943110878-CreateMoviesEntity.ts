import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesEntity1644943110878 implements MigrationInterface {
    name = 'CreateMoviesEntity1644943110878';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "poster" text, "synopsis" text, "release_year" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }
}
