import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1718452434996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE colaborator (
        id TEXT NOT NULL DEFAULT (lower(hex(randomblob(4))) || '-' || substr(lower(hex(randomblob(2))), 1, 4) || '-' || substr(lower(hex(randomblob(2))), 1, 4) || '-' || substr(lower(hex(randomblob(2))), 1, 4) || '-' || lower(hex(randomblob(6)))),
        isAllowed BOOLEAN NOT NULL DEFAULT false,
        name VARCHAR(256) NOT NULL,
        documentNumber VARCHAR(14) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        photo VARCHAR(256) NULL,
        CONSTRAINT colaborator_pk PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS colaborator;`);
  }
}
