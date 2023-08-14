import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from '../../../user/repository/entities/user.entity';
export const TagDatabaseName = 'tags';

@DatabaseEntity({ collection: TagDatabaseName })
export class TagEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 20,
    })
    name: string;

    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    description: string;

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    owner: string;
}

export const TagSchema = SchemaFactory.createForClass(TagEntity);

export type TagDoc = TagEntity & Document;

TagSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.name = this.name.toLowerCase();
    this.description = this.description.toLowerCase();

    next();
});
