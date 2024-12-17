import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EMPLEADOS_MICROSERVICE } from 'src/config';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(@Inject(EMPLEADOS_MICROSERVICE) private readonly empleadosClient: ClientProxy) {}

  @Post()
  createEmpleado(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosClient.send(
      {cmd: 'create_empleado'},
      createEmpleadoDto
    );
  }

  @Get()
  findAllEmpleados(@Query() paginationDto: PaginationDto) {
    return this.empleadosClient.send(
      {cmd: 'find_all_empleados'},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const empleado  = await firstValueFrom(
        this.empleadosClient.send(
          {cmd: 'find_one_empleado'},
          {id}
        )
      );
      return empleado;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchEmpleado(@Param('id', ParseIntPipe) id: number, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      const empleado = await firstValueFrom(
        this.empleadosClient.send(
          {cmd: 'update_empleado'},
          {...updateEmpleadoDto, id}
        )
      );
      return empleado;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteEmpleado(@Param('id') id: number) {
    try {
      const empleado = await firstValueFrom(
        this.empleadosClient.send(
          {cmd: 'delete_empleado'},
          {id}
        )
      );
      return empleado;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
