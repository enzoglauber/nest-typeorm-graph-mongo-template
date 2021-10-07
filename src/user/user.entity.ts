import { ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/common/helpers/cripto';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform // só funciona em RDBMS – relational database management systems
  })
  password: string;
}
