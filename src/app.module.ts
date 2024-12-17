import { Module } from '@nestjs/common';
import { CitasModule } from './citas/citas.module';
import { ClientesModule } from './clientes/clientes.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PagosModule } from './pagos/pagos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ServsolicitadosModule } from './servsolicitados/servsolicitados.module';

@Module({
  imports: [CitasModule, ClientesModule, EmpleadosModule, PagosModule, ServiciosModule, ServsolicitadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
