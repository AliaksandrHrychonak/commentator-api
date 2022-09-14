import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { TagEntity } from 'src/modules/tag/schemas/tag.schema';
import { UserEntity } from 'src/modules/user/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class CommentEntity {
    @Prop({
        required: true,
    })
    value: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name,
    })
    owner: Types.ObjectId;

    @Prop({
        required: true,
        type: Array,
        default: [],
        ref: TagEntity.name,
    })
    tags: Types.ObjectId[];

}

export const CommentDatabaseName = 'comments';
export const CommentSchema = SchemaFactory.createForClass(CommentEntity);

export type CommentDocument = CommentEntity & Document;
