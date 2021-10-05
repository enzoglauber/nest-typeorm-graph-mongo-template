import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import GraphQL from './graphql.config';
import TypeOrm from './typeorm.config';

@Module({
  imports: [
    GraphQL,
    TypeOrm,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
