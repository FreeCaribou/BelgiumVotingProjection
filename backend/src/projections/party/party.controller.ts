import { Controller, Get, Param } from '@nestjs/common';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {

  constructor(
    private partyService: PartyService,
  ) { }

  @Get('names')
  getAllName() {
    return this.partyService.getAllName();
  }

}
