import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Account{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @Field(() => String)
    name: string;

    @Column({ unique: true, type: 'varchar', length: 255 })
    @Field(() => String)
    email: string;

    @Column({ type: 'varchar', length: 255 })
    @Field(() => String)
    password: string

    @Column({ type: 'integer'})
    @Field(() => Int)
    role: number
}