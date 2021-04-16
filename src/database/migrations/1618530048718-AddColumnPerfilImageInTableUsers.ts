import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnPerfilImageInTableUsers1618530048718 implements MigrationInterface {
    name = 'AddColumnPerfilImageInTableUsers1618530048718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "perfil_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "perfil_image"`);
    }

}
