import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CommentGetSerialization, } from './comment.get.serialization';

export class CommentListSerialization extends PartialType(CommentGetSerialization) {}
