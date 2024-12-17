import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateServicioDto {
    @IsString()
    public nombreServicio: string;

    @IsString()
    public duracionServicio: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public costoServicio: number;

    @IsOptional()
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public descuentoServicio: number;

    @IsString()
    public tipoServicio: string;
}
