import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { CategoryDoc, CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends DatabaseMongoUUIDRepositoryAbstract<
    CategoryEntity,
    CategoryDoc
> {
    constructor(
        @DatabaseModel(CategoryEntity.name)
        private readonly tagModel: Model<CategoryEntity>
    ) {
        super(tagModel, {
            path: 'owner',
            localField: 'user',
            foreignField: '_id',
            model: UserEntity.name,
        });
    }
}
