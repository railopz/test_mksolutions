import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSale1691443111480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'sales',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'product_id',
              type: 'uuid',
            },
            {
              name: 'client_id',
              type: 'uuid',
            },
            {
              name: 'quantity',
              type: 'integer',
            },
            {
              name: 'total_price',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
      await queryRunner.createForeignKey(
        'sales',
        new TableForeignKey({
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'sales',
        new TableForeignKey({
          columnNames: ['client_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients',
          onDelete: 'CASCADE',
        }),
      );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('sales');
      const productForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
      const customerForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('client_id') !== -1);

      if (productForeignKey) {
        await queryRunner.dropForeignKey('sales', productForeignKey);
      }
      if (customerForeignKey) {
        await queryRunner.dropForeignKey('sales', customerForeignKey);
      }
      await queryRunner.dropTable('sales');
    }

}
