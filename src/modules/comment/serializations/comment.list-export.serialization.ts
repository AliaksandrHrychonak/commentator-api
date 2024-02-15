import { CommentGetSerialization } from './comment.get.serialization';
import { OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CommentListExportSerialization extends OmitType(
    CommentGetSerialization,
    ['owner'] as const
) {
    @Transform(({ obj }) => `${obj.owner._id}`)
    owner: string;

    @Transform(({ value }) => value.map(i => i._id).join(','))
    tags?: string;
}
