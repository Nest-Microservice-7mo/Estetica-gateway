import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PAGOS_MICROSERVICE } from 'src/config';
import { CreatePagoDto } from './dto/create-pago.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(@Inject(PAGOS_MICROSERVICE) private readonly pagosClient: ClientProxy) {}

  @Post()
  createPago(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosClient.send(
      {cmd: 'create_pago'},
      createPagoDto
    );
  }

  @Get()
  findAllPagos(@Query() paginatioDto: PaginationDto) {
    return this.pagosClient.send(
      {cmd: 'find_all_pagos'},
      paginatioDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const pago = await firstValueFrom(
        this.pagosClient.send(
          {cmd: 'find_one_pago'},
          {id}
        )
      );
      return pago;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchPago(@Param('id', ParseIntPipe) id:number, @Body() updatePagoDto: UpdatePagoDto) {
    try {
      const pago = await firstValueFrom(
        this.pagosClient.send(
          {cmd: 'update_pago'},
          {...updatePagoDto, id}
        )
      );
      return pago;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deletePago(@Param('id') id:number) {
    try {
      const pago = await firstValueFrom(
        this.pagosClient.send(
          {cmd: 'delete_pago'},
          {id}
        )
      );
      return pago;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
