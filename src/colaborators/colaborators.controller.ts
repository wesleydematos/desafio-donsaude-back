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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ColaboratorsService } from './colaborators.service';
import { ColaboratorDto, UpdateColaboratorDto } from './colaboratos.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('colaborators')
@UseGuards(AuthGuard)
@Controller('colaborators')
export class ColaboratorsController {
  constructor(private readonly colaboratorsService: ColaboratorsService) {}

  @ApiOperation({ summary: 'Create a new colaborator' })
  @ApiResponse({ status: 201, description: 'Colaborator created' })
  @ApiBody({ type: ColaboratorDto })
  @Post()
  async create(@Body() colaborator: ColaboratorDto) {
    return await this.colaboratorsService.create(colaborator);
  }

  @ApiOperation({ summary: 'Get all colaborators' })
  @ApiResponse({ status: 200, description: 'List of colaborators' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
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

  @ApiOperation({ summary: 'Get colaborator by ID' })
  @ApiResponse({ status: 200, description: 'Colaborator found' })
  @ApiResponse({ status: 404, description: 'Colaborator not found' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const colaborator = await this.colaboratorsService.findById(id);
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with id ${id} not found`);
    }
    return colaborator;
  }

  @ApiOperation({ summary: 'Update colaborator' })
  @ApiResponse({ status: 200, description: 'Colaborator updated' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateColaboratorDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() colaborator: UpdateColaboratorDto,
  ) {
    return await this.colaboratorsService.update(id, colaborator);
  }

  @ApiOperation({ summary: 'Delete colaborator' })
  @ApiResponse({ status: 200, description: 'Colaborator deleted' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.colaboratorsService.delete(id);
    return { message: 'Colaborator deleted successfully' };
  }
}
