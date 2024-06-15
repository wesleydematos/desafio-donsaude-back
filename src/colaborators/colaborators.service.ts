import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Colaborator } from 'src/database/entities/colaborators.entity';
import { ColaboratorDto, UpdateColaboratorDto } from './colaboratos.dto';

@Injectable()
export class ColaboratorsService {
  constructor(
    @InjectRepository(Colaborator)
    private readonly colaboratorRepository: Repository<Colaborator>,
  ) {}

  async create(newColaborator: ColaboratorDto): Promise<Colaborator> {
    newColaborator.password = hashSync(newColaborator.password, 10);

    const colaborator = this.colaboratorRepository.create(newColaborator);
    return await this.colaboratorRepository.save(colaborator);
  }

  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ data: Colaborator[]; count: number }> {
    const { page, limit, search } = options;

    const where = [
      ...(search
        ? [
            { name: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
            { documentNumber: Like(`%${search}%`) },
            { phone: Like(`%${search}%`) },
          ]
        : []),
    ];

    const [data, count] = await this.colaboratorRepository.findAndCount({
      where: where.length > 0 ? where : undefined,
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data, count };
  }

  async findById(id: string): Promise<Colaborator> {
    const colaborator = await this.colaboratorRepository.findOneBy({ id });
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with id ${id} not found`);
    }
    return colaborator;
  }

  async findByEmail(email: string): Promise<Colaborator> {
    const colaborator = await this.colaboratorRepository.findOneBy({ email });
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with email ${email} not found`);
    }
    return colaborator;
  }

  async update(
    id: string,
    updatedColaborator: UpdateColaboratorDto,
  ): Promise<Colaborator> {
    const colaborator = await this.findById(id);
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with id ${id} not found`);
    }

    if (updatedColaborator.password) {
      updatedColaborator.password = hashSync(updatedColaborator.password, 10);
    }

    Object.assign(colaborator, updatedColaborator);
    return await this.colaboratorRepository.save(colaborator);
  }

  async delete(id: string): Promise<void> {
    const colaborator = await this.findById(id);
    if (!colaborator) {
      throw new NotFoundException(`Colaborator with id ${id} not found`);
    }
    await this.colaboratorRepository.remove(colaborator);
  }
}
