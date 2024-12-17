import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTES_MICROSERVICE, envs } from 'src/config';

@Module({
  controllers: [ClientesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CLIENTES_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.clientesMicroservicePort,
        }
      }
    ]),
  ]
})

export class ClientesModule {}
