import {
  Body,
  Controller,
  Post,
  // UseGuards
} from '@nestjs/common';
import { ColaboratorsService } from './colaborators.service';
import { ColaboratorDto } from './colaboratos.dto';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('colaborators')
export class ColaboratorsController {
  constructor(private readonly colaboratorsService: ColaboratorsService) {}

  @Post()
  create(@Body() colaborator: ColaboratorDto) {
    this.colaboratorsService.create(colaborator);
  }

  // @UseGuards(AuthGuard)
}
