import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,ManyToMany } from "typeorm";
import { IUserEntity } from '../../domain/entities/IUserEntity';
import { RoleEntity } from "./roleEntity";
@Entity()
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'varchar' })
    username!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'varchar' })
    passwordHash!: string;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;

    //import InterviewEntity
    /*
    @ManyToMany(() => InterviewEntity)
    @JoinColumn({
        interview: InterviewEntity
    })
    */
    @Column({ type: 'varchar'})
    answers!: string
}
