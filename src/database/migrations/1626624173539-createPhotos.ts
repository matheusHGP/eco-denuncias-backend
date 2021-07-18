import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPhotos1626624173539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'photos',
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
                    name: 'is_occurrence',
                    type: 'boolean'
                },
                {
                    name: 'occurrence_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'teste',
                    referencedTableName: 'occurrences',
                    referencedColumnNames: ['id'],
                    columnNames: ['occurrence_id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('photos')
    }
}
