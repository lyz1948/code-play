import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cat/cats.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest', { useNewUrlParser: true }), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
