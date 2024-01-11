import { TagGetSerialization } from './tag.get.serialization';
import { OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class TagListExportSerialization extends OmitType(TagGetSerialization, [
    'owner',
] as const) {
    @Transform(({ value }) => value._id)
    owner: string;
}
