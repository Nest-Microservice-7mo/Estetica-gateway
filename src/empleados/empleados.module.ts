import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EMPLEADOS_MICROSERVICE, envs } from 'src/config';

@Module({
  controllers: [EmpleadosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: EMPLEADOS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.empleadosMicroservicePort
        }
      }
    ]),
  ]
})

export class EmpleadosModule {}
