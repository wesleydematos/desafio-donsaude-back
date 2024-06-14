import { Injectable } from '@nestjs/common';
import { ColaboratorDto } from './colaboratos.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class ColaboratorsService {
  create(newColaborator: ColaboratorDto) {
    newColaborator.id = uuid();
    newColaborator.password = hashSync(newColaborator.password, 10);

    console.log(newColaborator);
  }
}
