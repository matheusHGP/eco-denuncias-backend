import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOccurrences1626624063113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'occurrences',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'status_occurency_id',
                    type: 'uuid'
                },
                {
                    name: 'user_admin_id',
                    type: 'uuid'
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'problem_id',
                    type: 'uuid'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'neighborhood',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'integer'
                },
                {
                    name: 'other_observations',
                    type: 'varchar'
                },
                //auto de infração
                {
                    name: 'number_infringement',
                    type: 'integer'
                },
                {
                    name: 'date_occurred',
                    type: 'timestamp'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'offender_details',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKStatusOccurencyIdOccurence',
                    referencedTableName: 'status_ocurrences',
                    referencedColumnNames: ['id'],
                    columnNames: ['status_occurency_id']
                },
                {
                    name: 'FKUserAdminIdOccurence',
                    referencedTableName: 'users_admin',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_admin_id']
                },
                {
                    name: 'FKUserIdOccurence',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id']
                },
                {
                    name: 'FKProblemIdOccurence',
                    referencedTableName: 'problems',
                    referencedColumnNames: ['id'],
                    columnNames: ['problem_id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('occurrences')
    }
}
