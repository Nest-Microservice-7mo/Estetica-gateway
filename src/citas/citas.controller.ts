import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CITAS_MICROSERVICE } from 'src/config';
import { CreateCitaDto } from './dto/create-cita.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(@Inject(CITAS_MICROSERVICE) private readonly citasClient: ClientProxy) {}

  @Post()
  createCita(@Body() createCitaDto:CreateCitaDto) {
    return this.citasClient.send(
      {cmd: 'create_cita'},
      createCitaDto
    );
  }

  @Get()
  findAllCitas(@Query() paginationDto: PaginationDto) {
    return this.citasClient.send(
      {cmd: 'find_all_citas'},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const cita = await firstValueFrom(
        this.citasClient.send(
          {cmd: 'find_one_cita'},
          {id}
        )
      );
      return cita;
    } catch(error){
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchCita(@Param('id', ParseIntPipe) id:number, @Body() updateCitaDto:UpdateCitaDto) {
    try {
      const cita = await firstValueFrom(
        this.citasClient.send(
          {cmd: 'update_cita'},
          {...updateCitaDto, id}
        )
      );
      return cita;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteCita(@Param('id') id:number) {
    try {
      const cita = await firstValueFrom(
        this.citasClient.send(
          {cmd: 'delete_cita'},
          {id}
        )
      );
      return cita;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
