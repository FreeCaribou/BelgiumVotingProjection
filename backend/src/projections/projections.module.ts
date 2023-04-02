import { Module } from '@nestjs/common';
import { MunicipalityController } from './municipality/municipality.controller';
import { MunicipalityService } from './municipality/municipality.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService]
})
export class ProjectionsModule {}
