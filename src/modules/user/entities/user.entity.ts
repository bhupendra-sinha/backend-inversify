import { BaseEntity } from '@core/data/entity/baseEntity.model';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255, nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	password!: string;
}
