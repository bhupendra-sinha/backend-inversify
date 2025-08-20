import { v4 as uuidv4 } from 'uuid';
import { CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
	@PrimaryColumn({ type: 'uuid', default: uuidv4(), nullable: false })
	id!: string;

	@Column({ nullable: false, default: true })
	active!: boolean;

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;

	@Column({ type: 'uuid', nullable: true })
	createdBy?: string;

	@Column({ type: 'uuid', nullable: true })
	updatedBy?: string;
}
