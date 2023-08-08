import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';
import User from '@modules/users/infrastructure/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

enum SaleStatus {
  PAY = 'pay',
  PENDING = 'pending',
  CANCEL = 'cancel',
}

@Entity('sales')
class SaleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transaction: string;

  @Column()
  product_id: string;

  @Column()
  user_id: string;

  @Column()
  client_id: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.PENDING,
  })
  status: SaleStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default SaleEntity;
