import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Office } from 'src/entities/Offices.entity';
import * as data from '../utils/data.json';

@Injectable()
export class officesRepository {
  constructor(private officesRepository: Repository<Office>) {}
}
