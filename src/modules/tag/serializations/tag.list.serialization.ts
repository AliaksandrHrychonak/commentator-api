import { TagGetSerialization } from './tag.get.serialization';
import { OmitType } from '@nestjs/swagger';

export class TagListSerialization extends OmitType(
    TagGetSerialization,
    [] as const
) {}
