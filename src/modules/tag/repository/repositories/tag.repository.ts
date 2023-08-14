import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import {TagDoc, TagEntity} from "../entities/tag.entity";

@Injectable()
export class TagRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TagEntity,
    TagDoc
> {
    constructor(
        @DatabaseModel(TagEntity.name)
        private readonly tagModel: Model<TagEntity>
    ) {
        super(tagModel, {
            path: 'user',
            localField: 'user',
            foreignField: '_id',
            model: UserEntity.name,
        });
    }
}
