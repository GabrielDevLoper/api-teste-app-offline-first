import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAllTables1618117826946 implements MigrationInterface {
    name = 'CreateAllTables1618117826946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "setores" ("id" character varying NOT NULL, "nome" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_31be2048e5e63a853a5f0bbd614" UNIQUE ("nome"), CONSTRAINT "PK_85908551895de8d968532c35d07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "funcionarios" ("id" character varying NOT NULL, "nome" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idSetorId" character varying, CONSTRAINT "UQ_a0de321e9da6c025e7fc92f0bd8" UNIQUE ("cpf"), CONSTRAINT "PK_a6ee7c0e30d968db531ad073337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions_roles" ("id_role" character varying NOT NULL, "id_permission" character varying NOT NULL, CONSTRAINT "PK_c6551e2b6a2f698c887fe041b57" PRIMARY KEY ("id_role", "id_permission"))`);
        await queryRunner.query(`CREATE INDEX "IDX_284e14430999d61f028de2bdaa" ON "permissions_roles" ("id_role") `);
        await queryRunner.query(`CREATE INDEX "IDX_a57863dad0829db4d1035aeeff" ON "permissions_roles" ("id_permission") `);
        await queryRunner.query(`CREATE TABLE "users_roles" ("id_user" character varying NOT NULL, "id_role" character varying NOT NULL, CONSTRAINT "PK_e71aa325423f22d074cefe929c4" PRIMARY KEY ("id_user", "id_role"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44ac90a39fbb385131c2688254" ON "users_roles" ("id_user") `);
        await queryRunner.query(`CREATE INDEX "IDX_815859bd8638fbdb84e543bf1b" ON "users_roles" ("id_role") `);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD CONSTRAINT "FK_c4e783f7d5319f9e81b846d1c0c" FOREIGN KEY ("idSetorId") REFERENCES "setores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_284e14430999d61f028de2bdaab" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_a57863dad0829db4d1035aeeffe" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_44ac90a39fbb385131c26882544" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_815859bd8638fbdb84e543bf1b4" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_815859bd8638fbdb84e543bf1b4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_44ac90a39fbb385131c26882544"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_a57863dad0829db4d1035aeeffe"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_284e14430999d61f028de2bdaab"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP CONSTRAINT "FK_c4e783f7d5319f9e81b846d1c0c"`);
        await queryRunner.query(`DROP INDEX "IDX_815859bd8638fbdb84e543bf1b"`);
        await queryRunner.query(`DROP INDEX "IDX_44ac90a39fbb385131c2688254"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_a57863dad0829db4d1035aeeff"`);
        await queryRunner.query(`DROP INDEX "IDX_284e14430999d61f028de2bdaa"`);
        await queryRunner.query(`DROP TABLE "permissions_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "funcionarios"`);
        await queryRunner.query(`DROP TABLE "setores"`);
    }

}
