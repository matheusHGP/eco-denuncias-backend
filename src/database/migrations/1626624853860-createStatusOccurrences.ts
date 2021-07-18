import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStatusOccurrences1626624853860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'status_ocurrences',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'integer',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('status_ocurrences')
    }
}
