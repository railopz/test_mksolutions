import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateStock1691443074506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'stock_products',
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
              name: 'quantity',
              type: 'integer',
              default: 0,
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
      )

      await queryRunner.createForeignKey(
        'stock_products',
        new TableForeignKey({
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('stock_products');
      const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('stock_products', foreignKey);
      }

      await queryRunner.dropTable('stock_products');
    }

}
