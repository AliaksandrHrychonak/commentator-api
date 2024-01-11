import { OmitType } from '@nestjs/swagger';
import { TagCreateDto } from './tag.create.dto';

export class TagImportDto extends OmitType(TagCreateDto, [] as const) {}
