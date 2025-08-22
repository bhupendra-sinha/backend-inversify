import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	email!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	password!: string;
}
