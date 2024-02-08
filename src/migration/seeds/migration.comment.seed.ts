import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CommentService } from 'src/modules/comment/services/comment.service';

@Injectable()
export class MigrationCommentSeed {
    constructor(
        private readonly commentService: CommentService,
    ) {}

    @Command({
        command: 'remove:comment',
        describe: 'remove comments',
    })
    async remove(): Promise<void> {
        try {
            await this.commentService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}