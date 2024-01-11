import { PickType } from '@nestjs/swagger';
import { TagCreateDto } from './tag.create.dto';

export class TagUserCreateDto extends PickType(TagCreateDto, [
    'name',
    'description',
] as const) {}
