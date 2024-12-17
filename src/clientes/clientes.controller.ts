import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CLIENTES_MICROSERVICE } from 'src/config';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(@Inject(CLIENTES_MICROSERVICE) private readonly clientesClient: ClientProxy) {}

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesClient.send(
      {cmd: 'create_cliente'},
      createClienteDto
    );
  }

  @Get()
  findAllClientes(@Query() paginatioDto: PaginationDto) {
    return this.clientesClient.send(
      {cmd: 'find_all_clientes'},
      paginatioDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const cliente = await firstValueFrom(
        this.clientesClient.send(
          {cmd: 'find_one_cliente'},
          {id}
        )
      );
      return cliente;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchCliente(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await firstValueFrom(
        this.clientesClient.send(
          {cmd: 'update_cliente'},
          {...updateClienteDto, id}
        )
      );
      return cliente;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: number) {
    try {
      const cliente = await firstValueFrom(
        this.clientesClient.send(
          {cmd: 'delete_cliente'},
          {id}
        )
      );
      return cliente;
    } catch(error) {
      throw new RpcException(error);
    }
  }
}
