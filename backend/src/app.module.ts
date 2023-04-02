import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appDataSourceConfig } from './data-source';
import { ProjectionsModule } from './projections/projections.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...appDataSourceConfig()
    }),
    ProjectionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
