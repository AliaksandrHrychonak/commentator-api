import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { CommentDocument, CommentEntity } from '../schemas/comment.schema';

@Injectable()
export class CommentBulkService {
    constructor(
        @DatabaseEntity(CommentEntity.name)
        private readonly commentModel: Model<CommentDocument>
    ) {}

}
