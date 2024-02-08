import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from '../../../user/repository/entities/user.entity';
import { TagEntity } from '../../../tag/repository/entities/tag.entity';
export const CommentDatabaseName = 'comments';

@DatabaseEntity({ collection: CommentDatabaseName })
export class CommentEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: false,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    name?: string;

    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
    })
    value: string;

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    owner: string;

    @Prop({
        required: false,
        ref: TagEntity.name,
        index: true,
    })
    tags?: string[];
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);

export type CommentDoc = CommentEntity & Document;

CommentSchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        this.name = this.name?.toLowerCase();

        next();
    }
);
