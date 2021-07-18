import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProblems1626624639375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'problems',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'hash_image',
                    type: 'varchar'
                },
                {
                    name: 'status',
                    type: 'integer',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('problems')
    }
}
