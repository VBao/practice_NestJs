import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;
  @Column({ name: 'Username', type: 'varchar' })
  username: string;
  @Column({ name: 'Password', type: 'varchar' })
  password: string;
  @Column({ name: 'IsAdmin', type: 'boolean' })
  isAdmin: boolean;
}
