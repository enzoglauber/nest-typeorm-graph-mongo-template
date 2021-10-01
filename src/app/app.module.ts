import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://localhost/${process.env.DB_NAME}`,
      // url:`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.ieje9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,+
      synchronize: true,
      entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}