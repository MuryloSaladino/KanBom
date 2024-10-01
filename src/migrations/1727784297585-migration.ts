import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727784297585 implements MigrationInterface {
    name = 'Migration1727784297585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_invite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "teamId" uuid, CONSTRAINT "PK_deb3080b1edfad7d043d6db876e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_invite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "projectId" uuid, CONSTRAINT "PK_59d8ef464579bd0cfcb78e6b16b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "team_invite" ADD CONSTRAINT "FK_e937588d930a6b5fd66958b75f5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_invite" ADD CONSTRAINT "FK_dec64033827ee287d0863a1b180" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_invite" ADD CONSTRAINT "FK_be20e06130edbb5efefda24d8c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_invite" ADD CONSTRAINT "FK_0fb32c409824a69c9a640dbf885" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_invite" DROP CONSTRAINT "FK_0fb32c409824a69c9a640dbf885"`);
        await queryRunner.query(`ALTER TABLE "project_invite" DROP CONSTRAINT "FK_be20e06130edbb5efefda24d8c5"`);
        await queryRunner.query(`ALTER TABLE "team_invite" DROP CONSTRAINT "FK_dec64033827ee287d0863a1b180"`);
        await queryRunner.query(`ALTER TABLE "team_invite" DROP CONSTRAINT "FK_e937588d930a6b5fd66958b75f5"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "action" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "project_invite"`);
        await queryRunner.query(`DROP TABLE "team_invite"`);
    }

}
