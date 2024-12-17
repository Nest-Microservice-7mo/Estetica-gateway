import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PAGOS_MICROSERVICE } from 'src/config';

@Module({
  controllers: [PagosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PAGOS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.pagosMicroservicePort
        }
      }
    ]),
  ]
})

export class PagosModule {}
