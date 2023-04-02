import { Module } from '@nestjs/common';
import { MunicipalityController } from './municipality/municipality.controller';
import { MunicipalityService } from './municipality/municipality.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Projection } from './entities/projection.entity';
import { ProjectionService } from './projection/projection.service';
import { ProjectionController } from './projection/projection.controller';
import { Party } from './entities/party.entity';
import { PartyController } from './party/party.controller';
import { PartyService } from './party/party.service';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality, Projection, Party])],
  controllers: [MunicipalityController, ProjectionController, PartyController],
  providers: [MunicipalityService, ProjectionService, PartyService]
})
export class ProjectionsModule { }
