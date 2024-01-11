import { CommentGetSerialization } from './comment.get.serialization';
import { OmitType } from '@nestjs/swagger';

export class CommentListSerialization extends OmitType(
    CommentGetSerialization,
    [] as const
) {}
