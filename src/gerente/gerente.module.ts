import { Module } from '@nestjs/common';
import { GerentesService } from './gerente.service';
import { GerentesController } from './gerente.controller';

@Module({
  providers: [GerentesService],
  controllers: [GerentesController],
})
export class GerenteModule {}
