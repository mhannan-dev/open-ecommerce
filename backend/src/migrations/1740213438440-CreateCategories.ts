import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategories1740213438440 implements MigrationInterface {
    name = 'CreateCategories1740213438440';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`categories\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`parent_id\` INT NULL,
                \`slug\` VARCHAR(255) NULL,
                \`name\` VARCHAR(255) NOT NULL,
                \`type\` VARCHAR(50) NULL,
                \`is_active\` TINYINT NOT NULL DEFAULT 1,
                PRIMARY KEY (\`id\`)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`categories\`
        `);
    }
}
