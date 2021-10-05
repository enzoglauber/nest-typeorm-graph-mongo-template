import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const TypeOrm = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `mongodb://localhost/${process.env.DB_NAME}`,
  // url:`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.ieje9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,+
  synchronize: process.env.DB_SYNC == 'true',
  entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepConnectionAlive: true,
  logging: true,
})

export default TypeOrm;
