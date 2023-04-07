import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddMunicipalityDto } from '../dto/add-municipality.dto';
import { Municipality } from '../entities/municipality.entity';

@Injectable()
export class MunicipalityService {

    constructor(
        @InjectRepository(Municipality)
        private readonly municipalityRepository: Repository<Municipality>,
    ) { }

    getAll() {
        return this.municipalityRepository.find({ relations: [Municipality.projectionsRelationName] });
    }

    add(addMuncipalityDto: AddMunicipalityDto) {
        return this.municipalityRepository.save(this.municipalityRepository.create(addMuncipalityDto));
    }

}
