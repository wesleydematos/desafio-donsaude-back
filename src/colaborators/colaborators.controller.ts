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
  HttpCode,
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

  @ApiOperation({ summary: 'Cria um novo colaborador' })
  @ApiResponse({ status: 201, description: 'Colaborador criado' })
  @ApiBody({ type: ColaboratorDto })
  @Post()
  async create(@Body() colaborator: ColaboratorDto) {
    return await this.colaboratorsService.create(colaborator);
  }

  @ApiOperation({
    summary: 'Busca todos colaboradores, aceitando parametros de busca.',
  })
  @ApiResponse({ status: 200, description: 'Colaboradores listados' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'isAllowed', required: false, type: Boolean })
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('isAllowed') isAllowed?: boolean,
  ) {
    return await this.colaboratorsService.findAll({
      page,
      limit,
      search,
      isAllowed,
    });
  }

  @ApiOperation({ summary: 'Busca colaborador por ID' })
  @ApiResponse({ status: 200, description: 'Colaborador encontrado' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.colaboratorsService.findById(id);
  }

  @ApiOperation({ summary: 'Atualiza colaborador' })
  @ApiResponse({ status: 200, description: 'Colaborador atualizado' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateColaboratorDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() colaborator: UpdateColaboratorDto,
  ) {
    return await this.colaboratorsService.update(id, colaborator);
  }

  @ApiOperation({ summary: 'Deleta colaborador' })
  @ApiResponse({ status: 204, description: 'Colaborador deletado' })
  @ApiParam({ name: 'id', required: true })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.colaboratorsService.delete(id);
  }
}
