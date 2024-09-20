import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726837169883 implements MigrationInterface {
    name = 'Migration1726837169883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6a72c3c0f683f6462415e653c3a" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_831a5a06f879fb0bebf89658713" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ac27b070934c64650ab339f4c6d" DEFAULT getdate(), "deletedAt" datetime2, "source" nvarchar(MAX) NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
