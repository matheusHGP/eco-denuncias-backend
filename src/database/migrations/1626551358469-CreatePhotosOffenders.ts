import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePhotosOffenders1626551358469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'photos_offenders',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'observation',
                    type: 'varchar'
                },
                {
                    name: 'hash_image',
                    type: 'varchar'
                },
                {
                    name: 'occurrence_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKOccurrenceIdPhotosOffender',
                    referencedTableName: 'occurrences',
                    referencedColumnNames: ['id'],
                    columnNames: ['occurrence_id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('photos_offenders')
    }
}
