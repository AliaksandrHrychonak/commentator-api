import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentRepositoryModule } from './repository/comment.repository.module';

@Module({
    imports: [CommentRepositoryModule],
    exports: [CommentService],
    providers: [CommentService],
    controllers: [],
})
export class CommentModule {}
