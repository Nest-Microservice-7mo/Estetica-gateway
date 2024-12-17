import { Module } from '@nestjs/common';
import { ServsolicitadosController } from './servsolicitados.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SERVSOLICITADOS_MICROSERVICE } from 'src/config';

@Module({
  controllers: [ServsolicitadosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: SERVSOLICITADOS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.servsolicitadosMicroservicePort
        }
      }
    ]),
  ]
})

export class ServsolicitadosModule {}
