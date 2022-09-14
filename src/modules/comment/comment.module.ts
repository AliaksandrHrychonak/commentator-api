import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { CommentEntity, CommentSchema, CommentDatabaseName } from './schemas/comment.schema';
import { CommentBulkService } from './services/comment.bulk.service';
import { CommentService } from './services/comment.service';


@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CommentEntity.name,
                    schema: CommentSchema,
                    collection: CommentDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [CommentService, CommentBulkService],
    providers: [CommentService, CommentBulkService],
    controllers: [],
})
export class CommentModule {}