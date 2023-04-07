import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProjectionDto } from '../dto/add-projection.dto';
import { Party } from '../entities/party.entity';
import { Projection } from '../entities/projection.entity';

@Injectable()
export class ProjectionService {

  constructor(
    @InjectRepository(Projection)
    private readonly projectionRepository: Repository<Projection>,
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
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

  // TODO sync mode please
  async add(addProjectionDto: AddProjectionDto) {
    console.log('projection dto ?', addProjectionDto)
    let projection = await this.projectionRepository.save(this.projectionRepository.create(addProjectionDto));
    for (let i = 0; i < addProjectionDto.parties.length; i++) {
      await this.partyRepository.save(this.partyRepository.create({
        projection,
        label: addProjectionDto.parties[i].label,
        votes: addProjectionDto.parties[i].votes,
      }));
    }
    return projection;
  }

}
