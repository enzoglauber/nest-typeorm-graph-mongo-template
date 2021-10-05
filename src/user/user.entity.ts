import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';


// @ObjectType()
@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
