import { Types } from "mongoose";
import { TagDocument } from "../tag/schemas/tag.schema";
import { CommentCreateDto } from "./dtos/comment.create.dto";

export interface ICommentDocument extends Omit<TagDocument, 'tags'> {
    tags: TagDocument[];
}


export interface ICommentCreate extends CommentCreateDto {
    owner?: Types.ObjectId;
}