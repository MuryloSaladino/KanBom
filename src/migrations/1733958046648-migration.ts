import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733958046648 implements MigrationInterface {
    name = 'Migration1733958046648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD "index" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "card_lists" ADD "index" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_lists" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "index"`);
    }

}
