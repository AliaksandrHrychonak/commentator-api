import { PartialType } from '@nestjs/mapped-types';
import { CommentGetSerialization, } from './comment.get.serialization';

export class CommentListSerialization extends PartialType(CommentGetSerialization) {}
