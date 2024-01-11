import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { CommentEntity, CommentSchema } from './entities/comment.entity';
import { CommentRepository } from './repositories/comment.repository';

@Module({
    providers: [CommentRepository],
    exports: [CommentRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CommentEntity.name,
                    schema: CommentSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CommentRepositoryModule {}
