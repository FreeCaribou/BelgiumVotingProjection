import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Party } from '../entities/party.entity';
import { uniqBy } from 'lodash';

@Injectable()
export class PartyService {

  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
  ) { }

  // get all the different name of the previous existing party
  getAllName() {
    return from(this.partyRepository.find()).pipe(map(party => uniqBy(party, 'label').map(p => p.label)));
  }

}
