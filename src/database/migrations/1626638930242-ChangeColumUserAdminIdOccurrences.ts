import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumUserAdminIdOccurrences1626638930242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('occurrences',
            'user_admin_id',
            new TableColumn({
                name: 'user_admin_id',
                type: 'uuid',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('occurrences',
            'user_admin_id',
            new TableColumn({
                name: 'user_admin_id',
                type: 'uuid',
            })
        )
    }
}