import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @Column({ length: 255, nullable: false })
  name!: string;
}
