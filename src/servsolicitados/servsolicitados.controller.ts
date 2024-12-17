import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SERVSOLICITADOS_MICROSERVICE } from 'src/config';
import { CreateServsolicitadoDto } from './dto/create-servsolicitado.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdateServsolicitadoDto } from './dto/update-servsolicitado.dto';

@Controller('servsolicitados')
export class ServsolicitadosController {
  constructor(@Inject(SERVSOLICITADOS_MICROSERVICE) private readonly servsolicitadosClient: ClientProxy) {}

  @Post()
  createServSolicitado(@Body() createServSolicitadoDto: CreateServsolicitadoDto) {
    return this.servsolicitadosClient.send(
      {cmd: 'create_servsolicitado'},
      createServSolicitadoDto
    );
  }

  @Get()
  findAllServSol(@Query() paginationDto: PaginationDto) {
    return this.servsolicitadosClient.send(
      {cmd: 'find_all_servsolicitados'},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const servsolicitado = await firstValueFrom(
        this.servsolicitadosClient.send(
          {cmd: 'find_one_servsolicitado'},
          {id}
        )
      );
      return servsolicitado;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchServSol(@Param('id', ParseIntPipe) id: number, @Body() updateServsolicitadoDto: UpdateServsolicitadoDto) {
    try {
      const servsolicitado = await firstValueFrom(
        this.servsolicitadosClient.send(
          {cmd: 'update_servsolicitado'},
          {...updateServsolicitadoDto, id}
        )
      );
      return servsolicitado;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteServSol(@Param('id') id: number) {
    try {
      const servsolicitado = await firstValueFrom(
        this.servsolicitadosClient.send(
          {cmd: 'delete_servsolicitado'},
          {id}
        )
      );
      return servsolicitado;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
