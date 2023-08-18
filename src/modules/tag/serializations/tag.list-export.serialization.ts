import { TagGetSerialization } from './tag.get.serialization';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { UserProfileSerialization } from '../../user/serializations/user.profile.serialization';

export class TagListExportSerialization extends OmitType(TagGetSerialization, [
    'owner',
] as const) {
    @ApiProperty({
        required: true,
        nullable: false,
        type: () => UserProfileSerialization,
    })
    @Type(() => UserProfileSerialization)
    @Transform(({ obj }) => `${obj.owner._id}`)
    readonly owner: string;
}
