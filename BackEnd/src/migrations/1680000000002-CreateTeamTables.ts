import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamTables1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        "ownerToken" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT now()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team_pokemon" (
        id SERIAL PRIMARY KEY,
        team_id integer REFERENCES team(id) ON DELETE CASCADE,
        pokemon_id integer REFERENCES pokemon(id) ON DELETE CASCADE,
        slot integer
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "team_pokemon"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "team"`);
  }
}
