import { CommentGetSerialization } from './comment.get.serialization';
import { OmitType } from '@nestjs/swagger';

export class CommentListExportSerialization extends OmitType(
    CommentGetSerialization,
    ['owner'] as const
) {
    owner: string;
}
