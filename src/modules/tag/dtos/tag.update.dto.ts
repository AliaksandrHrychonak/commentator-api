import { PartialType } from '@nestjs/mapped-types';
import { TagCreateDto } from './tag.create.dto';

export class RoleUpdateDto extends PartialType(TagCreateDto) {}
