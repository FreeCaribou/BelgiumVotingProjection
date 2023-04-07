import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddMunicipalityDto } from '../dto/add-municipality.dto';
import { MunicipalityService } from './municipality.service';

@Controller('municipality')
export class MunicipalityController {

    constructor(
        private municipalityService: MunicipalityService,
    ) { }

    @Get('')
    getAll() {
        return this.municipalityService.getAll();
    }

    @Post()
    add(@Body() addMunicipalityDto: AddMunicipalityDto) {
        return this.municipalityService.add(addMunicipalityDto);
    }

}
