import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727097226241 implements MigrationInterface {
    name = 'Migration1727097226241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_details" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_fb08394d3f499b9e441cab9ca51" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_94547c5df28e6556fdf5d541cd5" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_177334502e472d7d9b997495552" DEFAULT getdate(), "deletedAt" datetime2, "birthdate" datetime NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar(150) NOT NULL, "profilePicture" varchar(1024), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6271df0a7aed1d6c0691ce6ac50" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_4a38e9851744414bbe8142157f4" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_7ac9a109e2afca520ed60ea5e00" DEFAULT getdate(), "deletedAt" datetime2, "name" varchar(50) NOT NULL, "thumbnail" varchar(255) NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_1cda06c31eec1c95b3365a0283f" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_56a98c61f3a2655f74936b4ac02" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_c5201343a2cb791ed5ba432492e" DEFAULT getdate(), "deletedAt" datetime2, "role" varchar(20) NOT NULL, "userId" uniqueidentifier, "projectId" uniqueidentifier, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_7e5523774a38b08a6236d322403" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_a9ff9afa3a94c4032985300b9f0" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0d6d3684a667d25ffedd81b9f2c" DEFAULT getdate(), "deletedAt" datetime2, "name" varchar(50) NOT NULL, "ownerId" uniqueidentifier, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_28b53062261b996d9c99fa12404" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_12d2c4a4f7ac9472f51610b2f71" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_3aa4c8c63867c680ea06368b2fd" DEFAULT getdate(), "deletedAt" datetime2, "userId" uniqueidentifier, "teamId" uniqueidentifier, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6a72c3c0f683f6462415e653c3a" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_831a5a06f879fb0bebf89658713" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ac27b070934c64650ab339f4c6d" DEFAULT getdate(), "deletedAt" datetime2, "action" varchar(MAX) NOT NULL, "content" nvarchar(MAX) NOT NULL, "userId" uniqueidentifier, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), "deletedAt" datetime2, "email" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "detailsId" uniqueidentifier NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_a8687924ae4d52f05db87f3352" ON "users" ("detailsId") WHERE "detailsId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_930a407b85c1dfb573df6f76335" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_b5ebe13256317503931ecabb556" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_839756572a2c38eb5a3b563126e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_b0fe0d62c4fd4633321fdf9616f" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8687924ae4d52f05db87f3352f"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_b0fe0d62c4fd4633321fdf9616f"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_b5ebe13256317503931ecabb556"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_930a407b85c1dfb573df6f76335"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`DROP INDEX "REL_a8687924ae4d52f05db87f3352" ON "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
    }

}
