import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnPhotos1626702521892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('photos', new TableColumn({
            name: 'observation',
            type: 'varchar'
        }), new TableColumn({
            name: 'observation',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('photos', new TableColumn({
            name: 'observation',
            type: 'varchar',
            isNullable: true
        }), new TableColumn({
            name: 'observation',
            type: 'varchar'
        }))
    }
}
