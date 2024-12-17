import { PartialType } from '@nestjs/mapped-types';
import { CreateServsolicitadoDto } from './create-servsolicitado.dto';

export class UpdateServsolicitadoDto extends PartialType(CreateServsolicitadoDto) {}