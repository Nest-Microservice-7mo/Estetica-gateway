import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SERVICIOS_MICROSERVICE } from 'src/config';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(@Inject(SERVICIOS_MICROSERVICE) private readonly serviciosClient: ClientProxy) {}

  @Post()
  createServicio(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosClient.send(
      {cmd: 'create_servicio'},
      createServicioDto
    );
  }

  @Get()
  findAllServicios(@Query() paginationDto: PaginationDto) {
    return this.serviciosClient.send(
      {cmd: 'find_all_servicios'},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const servicio = await firstValueFrom(
        this.serviciosClient.send(
          {cmd: 'find_one_servicio'},
          {id}
        )
      );
      return servicio;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchServicio(@Param('id', ParseIntPipe) id: number, @Body() updateServicioDto: UpdateServicioDto) {
    try {
      const servicio = await firstValueFrom(
        this.serviciosClient.send(
          {cmd: 'update_servicio'},
          {...updateServicioDto, id}
        )
      );
      return servicio;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteServicio(@Param('id') id:number) {
    try {
      const servicio = await firstValueFrom(
        this.serviciosClient.send(
          {cmd: 'delete_servicio'},
          {id}
        )
      );
      return servicio;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
