import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projection } from '../entities/projection.entity';

@Injectable()
export class ProjectionService {

  constructor(
    @InjectRepository(Projection)
    private readonly projectionRepository: Repository<Projection>,
  ) { }

  getAll() {
    return this.projectionRepository.find({
      relations: [
        Projection.municipalityRelationName,
      ]
    });
  }

  getAllForOneMunicipality(municipalityId: number) {
    return this.projectionRepository.find({
      where: {
        municipality: { id: municipalityId }
      },
    });
  }

  getOneById(id: number) {
    return this.projectionRepository.findOne({
      where: {
        id
      },
      relations: [
        Projection.partiesRelationName,
        Projection.municipalityRelationName,
      ]
    });
  }

}
