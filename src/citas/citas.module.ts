import { Module } from '@nestjs/common';
import { CitasController } from './citas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CITAS_MICROSERVICE, envs } from 'src/config';

@Module({
  controllers: [CitasController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CITAS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.microserviceHost,
          port: envs.citasMicroservicePort
        }
      }
    ]),
  ]
})

export class CitasModule {}