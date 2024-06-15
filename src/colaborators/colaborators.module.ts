import { Module } from '@nestjs/common';
import { ColaboratorsController } from './colaborators.controller';
import { ColaboratorsService } from './colaborators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborator } from 'src/database/entities/colaborators.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborator])],
  controllers: [ColaboratorsController],
  providers: [ColaboratorsService],
  exports: [ColaboratorsService],
})
export class ColaboratorsModule {}
