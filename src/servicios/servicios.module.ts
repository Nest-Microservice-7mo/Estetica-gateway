import { Module } from '@nestjs/common';
import { ServiciosController } from './servicios.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SERVICIOS_MICROSERVICE } from 'src/config';

@Module({
  controllers: [ServiciosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: SERVICIOS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.serviciosMicroservicePort
        }
      }
    ]),
  ]
})

export class ServiciosModule {}
