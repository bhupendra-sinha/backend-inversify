import { Column, Entity } from 'typeorm';

@Entity('users')
export class User {
	@Column({ length: 255, nullable: false })
	name!: string;
}
