import { Module } from '@nestjs/common';
import { ColaboratorsController } from './colaborators.controller';
import { ColaboratorsService } from './colaborators.service';

@Module({
  controllers: [ColaboratorsController],
  providers: [ColaboratorsService],
  exports: [ColaboratorsService],
})
export class ColaboratorsModule {}
