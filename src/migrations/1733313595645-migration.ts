import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733313595645 implements MigrationInterface {
    name = 'Migration1733313595645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" character varying NOT NULL, "publicId" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birthdate" date NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(150) NOT NULL, "pictureId" uuid, CONSTRAINT "REL_99cfe9a55c907b792806636134" UNIQUE ("pictureId"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "boardId" uuid NOT NULL, "description" character varying(15) NOT NULL, "color" character(7) NOT NULL, CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_participations" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_e148b3d0a44c049cef42b0e0305" PRIMARY KEY ("userId", "cardId"))`);
        await queryRunner.query(`CREATE TABLE "card_labels" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "labelId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_aa1ec72d3a34b42ebcf0cce83d4" PRIMARY KEY ("labelId", "cardId"))`);
        await queryRunner.query(`CREATE TABLE "card_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" text NOT NULL, "userId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_c5367a0c06faabb34dd6daad529" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" text NOT NULL, "userId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_2951f0e2ca3280a1e68cae5c9fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "cardListId" uuid NOT NULL, "description" character varying NOT NULL, "detailedDescription" text NOT NULL, "startDate" date, "finishDate" date, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "boardId" uuid NOT NULL, "name" character varying NOT NULL, "color" character(7) NOT NULL DEFAULT '#00B4D8', CONSTRAINT "PK_a611f608826e0d1ce126d0a0798" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_roles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" character varying(20) NOT NULL, "userId" uuid NOT NULL, "boardId" uuid NOT NULL, CONSTRAINT "PK_4297d5492b50459be459cee67e3" PRIMARY KEY ("userId", "boardId"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "color" character(7) NOT NULL DEFAULT '#00B4D8', "workspaceId" uuid NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspaces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_26e75ee1af1006c2b4fc6c14f38" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "detailsId" uuid NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_a8687924ae4d52f05db87f3352" UNIQUE ("detailsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "content" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace_invites" ("userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_b13bdb6bae12e39252ac385f66f" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE TABLE "card_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" character varying NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_1d645200b8c1f1ba2074b353f36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "FK_99cfe9a55c907b792806636134e" FOREIGN KEY ("pictureId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_18b754f85358843adaceb6703c4" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_participations" ADD CONSTRAINT "FK_82d879817206b012cb76526b5c2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_participations" ADD CONSTRAINT "FK_1ce857d78cb11cc897f97a567c0" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_labels" ADD CONSTRAINT "FK_6da76a3caad8c8f633a667e7561" FOREIGN KEY ("labelId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_labels" ADD CONSTRAINT "FK_2370e81e673e257847542750d1c" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_logs" ADD CONSTRAINT "FK_039c89bae60964953c8e05a4cd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_logs" ADD CONSTRAINT "FK_4fab0149d1da7dee8fad4ce6acb" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_comments" ADD CONSTRAINT "FK_d738ecce363167b0b4330715d7b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_comments" ADD CONSTRAINT "FK_9cd85f7c56cf9089d0445c1e2b9" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_4c1a1361f85610cd474daae3f95" FOREIGN KEY ("cardListId") REFERENCES "card_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_lists" ADD CONSTRAINT "FK_597072da978615722561a874d57" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_roles" ADD CONSTRAINT "FK_b9326eb09b2f20a48363ff1680c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_roles" ADD CONSTRAINT "FK_705a167b416b78cd836c0161fda" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_f13eef6b2a45019e1df9cfe9963" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_839756572a2c38eb5a3b563126e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_cbf38a59fecb2b989290361d179" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "user_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_invites" ADD CONSTRAINT "FK_96884406b7e974078eec18babc6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_invites" ADD CONSTRAINT "FK_15fbf04707ec6ecaad8667fbc25" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_attachments" ADD CONSTRAINT "FK_2ed5176f36fe13c83f319fa0822" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_attachments" DROP CONSTRAINT "FK_2ed5176f36fe13c83f319fa0822"`);
        await queryRunner.query(`ALTER TABLE "workspace_invites" DROP CONSTRAINT "FK_15fbf04707ec6ecaad8667fbc25"`);
        await queryRunner.query(`ALTER TABLE "workspace_invites" DROP CONSTRAINT "FK_96884406b7e974078eec18babc6"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8687924ae4d52f05db87f3352f"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_cbf38a59fecb2b989290361d179"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "workspaces" DROP CONSTRAINT "FK_77607c5b6af821ec294d33aab0c"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_f13eef6b2a45019e1df9cfe9963"`);
        await queryRunner.query(`ALTER TABLE "board_roles" DROP CONSTRAINT "FK_705a167b416b78cd836c0161fda"`);
        await queryRunner.query(`ALTER TABLE "board_roles" DROP CONSTRAINT "FK_b9326eb09b2f20a48363ff1680c"`);
        await queryRunner.query(`ALTER TABLE "card_lists" DROP CONSTRAINT "FK_597072da978615722561a874d57"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_4c1a1361f85610cd474daae3f95"`);
        await queryRunner.query(`ALTER TABLE "card_comments" DROP CONSTRAINT "FK_9cd85f7c56cf9089d0445c1e2b9"`);
        await queryRunner.query(`ALTER TABLE "card_comments" DROP CONSTRAINT "FK_d738ecce363167b0b4330715d7b"`);
        await queryRunner.query(`ALTER TABLE "card_logs" DROP CONSTRAINT "FK_4fab0149d1da7dee8fad4ce6acb"`);
        await queryRunner.query(`ALTER TABLE "card_logs" DROP CONSTRAINT "FK_039c89bae60964953c8e05a4cd9"`);
        await queryRunner.query(`ALTER TABLE "card_labels" DROP CONSTRAINT "FK_2370e81e673e257847542750d1c"`);
        await queryRunner.query(`ALTER TABLE "card_labels" DROP CONSTRAINT "FK_6da76a3caad8c8f633a667e7561"`);
        await queryRunner.query(`ALTER TABLE "card_participations" DROP CONSTRAINT "FK_1ce857d78cb11cc897f97a567c0"`);
        await queryRunner.query(`ALTER TABLE "card_participations" DROP CONSTRAINT "FK_82d879817206b012cb76526b5c2"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_18b754f85358843adaceb6703c4"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "FK_99cfe9a55c907b792806636134e"`);
        await queryRunner.query(`DROP TABLE "card_attachments"`);
        await queryRunner.query(`DROP TABLE "workspace_invites"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "workspaces"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "board_roles"`);
        await queryRunner.query(`DROP TABLE "card_lists"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "card_comments"`);
        await queryRunner.query(`DROP TABLE "card_logs"`);
        await queryRunner.query(`DROP TABLE "card_labels"`);
        await queryRunner.query(`DROP TABLE "card_participations"`);
        await queryRunner.query(`DROP TABLE "labels"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
