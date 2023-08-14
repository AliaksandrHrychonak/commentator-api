import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { TagGetSerialization } from './tag.get.serialization';
import { Exclude, Type } from 'class-transformer';
import { UserGetSerialization } from '../../user/serializations/user.get.serialization';

export class TagListSerialization extends OmitType(TagGetSerialization, [
    'owner',
] as const) {
    @ApiHideProperty()
    @Type(() => UserGetSerialization)
    @Exclude()
    readonly owner: UserGetSerialization;
}
