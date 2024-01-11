import { CommentGetSerialization } from './comment.get.serialization';
import { OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CommentListExportSerialization extends OmitType(
    CommentGetSerialization,
    ['owner'] as const
) {
    @Transform(({ value }) => value._id)
    owner: string;
}
