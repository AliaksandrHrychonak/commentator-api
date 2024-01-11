import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from '../../../user/repository/entities/user.entity';
export const CategoryDatabaseName = 'categories';

@DatabaseEntity({ collection: CategoryDatabaseName })
export class CategoryEntity extends DatabaseMongoUUIDEntityAbstract {
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

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);

export type CategoryDoc = CategoryEntity & Document;

CategorySchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        this.name = this.name.toLowerCase();

        next();
    }
);
