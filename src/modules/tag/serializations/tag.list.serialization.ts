import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';
import { TagGetSerialization } from './tag.get.serialization';

export class TagListSerialization extends OmitType(TagGetSerialization, [
    'owner',
] as const) {
    @Exclude()
    readonly owner: Types.ObjectId;
}
