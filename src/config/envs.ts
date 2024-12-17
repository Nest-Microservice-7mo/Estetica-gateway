import  'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    MICROSERVICE_HOST: string;
    CITAS_MICROSERVICE_PORT: number;
    CLIENTES_MICROSERVICE_PORT: number;
    EMPLEADOS_MICROSERVICE_PORT: number;
    PAGOS_MICROSERVICE_PORT: number;
    SERVICIOS_MICROSERVICE_PORT: number;
    SERVSOLICITADOS_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    MICROSERVICE_HOST: joi.string().required(),
    CITAS_MICROSERVICE_PORT: joi.number().required(),
    CLIENTES_MICROSERVICE_PORT: joi.number().required(),
    EMPLEADOS_MICROSERVICE_PORT: joi.number().required(),
    PAGOS_MICROSERVICE_PORT: joi.number().required(),
    SERVICIOS_MICROSERVICE_PORT: joi.number().required(),
    SERVSOLICITADOS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

const{error, value} = envsSchema.validate(process.env);

if(error) {
    throw new Error(`Error de Configuración: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    microserviceHost: envVars.MICROSERVICE_HOST,
    citasMicroservicePort: envVars.CITAS_MICROSERVICE_PORT,
    clientesMicroservicePort: envVars.CLIENTES_MICROSERVICE_PORT,
    empleadosMicroservicePort: envVars.EMPLEADOS_MICROSERVICE_PORT,
    pagosMicroservicePort: envVars.PAGOS_MICROSERVICE_PORT,
    serviciosMicroservicePort: envVars.SERVICIOS_MICROSERVICE_PORT,
    servsolicitadosMicroservicePort: envVars.SERVSOLICITADOS_MICROSERVICE_PORT,
}