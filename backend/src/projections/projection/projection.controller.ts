import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AddProjectionDto } from '../dto/add-projection.dto';
import { ProjectionService } from './projection.service';

@Controller('projection')
export class ProjectionController {

  constructor(
    private projectionService: ProjectionService,
  ) { }

  @Get('')
  getAll() {
    return this.projectionService.getAll();
  }

  @Get('municipality/:municipalityId')
  getAllForOneMunicipality(@Param('municipalityId') municipalityId: number) {
    return this.projectionService.getAllForOneMunicipality(municipalityId);
  }

  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.projectionService.getOneById(id);
  }

  @Post()
  add(@Body() addProjectionDto: AddProjectionDto) {
      return this.projectionService.add(addProjectionDto);
  }

}
