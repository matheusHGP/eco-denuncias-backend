import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsUsers1626660152227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'last_name',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'whatsapp',
                    type: 'varchar',
                    isNullable: true
                })
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns(
            'users',
            [
                new TableColumn({
                    name: 'last_name',
                    type: 'varchar',
                    isNullable: true
                }),
                new TableColumn({
                    name: 'whatsapp',
                    type: 'varchar',
                    isNullable: true
                })
            ]
        )
    }

}
