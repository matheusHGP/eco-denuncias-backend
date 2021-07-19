import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnExplicationProblems1626666828854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('problems', new TableColumn({
            name: 'explication',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('problems', new TableColumn({
            name: 'explication',
            type: 'varchar',
            isNullable: true
        }))
    }
}
