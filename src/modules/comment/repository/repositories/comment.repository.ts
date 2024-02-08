import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { CommentDoc, CommentEntity } from '../entities/comment.entity';
import { TagEntity } from '../../../tag/repository/entities/tag.entity';

@Injectable()
export class CommentRepository extends DatabaseMongoUUIDRepositoryAbstract<
    CommentEntity,
    CommentDoc
> {
    constructor(
        @DatabaseModel(CommentEntity.name)
        private readonly commentModel: Model<CommentEntity>
    ) {
        super(commentModel, [
            {
                path: 'owner',
                localField: 'user',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'tags',
                localField: 'tag',
                foreignField: '_id',
                model: TagEntity.name,
            },
        ]);
    }
}
