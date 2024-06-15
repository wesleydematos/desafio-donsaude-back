import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ColaboratorsService } from './colaborators.service';
import { ColaboratorDto, UpdateColaboratorDto } from './colaboratos.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('colaborators')
@UseGuards(AuthGuard)
export class ColaboratorsController {
  constructor(private readonly colaboratorsService: ColaboratorsService) {}

  @Post()
  async create(@Body() colaborator: ColaboratorDto) {
    return await this.colaboratorsService.create(colaborator);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return await this.colaboratorsService.findAll({
      page,
      limit,
      search,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const colaborator = await this.colaboratorsService.findById(id);
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with id ${id} not found`);
    }
    return colaborator;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() colaborator: UpdateColaboratorDto,
  ) {
    return await this.colaboratorsService.update(id, colaborator);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.colaboratorsService.delete(id);
    return { message: 'Colaborator deleted successfully' };
  }
}
