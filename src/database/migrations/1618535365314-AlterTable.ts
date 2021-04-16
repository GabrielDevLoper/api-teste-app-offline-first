import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTable1618535365314 implements MigrationInterface {
    name = 'AlterTable1618535365314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "perfil_image"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "key" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "perfil_image" character varying`);
    }

}
