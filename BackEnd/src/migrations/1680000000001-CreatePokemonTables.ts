import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTables1680000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pokemon" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        "externalId" integer,
        height integer,
        weight integer,
        sprites json
      );
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pokemon_type" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pokemon_stat" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        base integer NOT NULL,
        pokemon_id integer REFERENCES pokemon(id) ON DELETE CASCADE
      );
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pokemon_types" (
        pokemon_id integer REFERENCES pokemon(id) ON DELETE CASCADE,
        pokemon_type_id integer REFERENCES pokemon_type(id) ON DELETE CASCADE,
        PRIMARY KEY (pokemon_id, pokemon_type_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "pokemon_types"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "pokemon_stat"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "pokemon_type"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "pokemon"`);
  }
}
