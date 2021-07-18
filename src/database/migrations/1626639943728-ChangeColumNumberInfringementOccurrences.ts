import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumNumberInfringementOccurrences1626639943728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('occurrences',
            'number_infringement',
            new TableColumn({
                name: 'number_infringement',
                type: 'integer',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('occurrences',
            'number_infringement',
            new TableColumn({
                name: 'number_infringement',
                type: 'integer',
            })
        )
    }
}
