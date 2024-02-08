import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { TagService } from 'src/modules/tag/services/tag.service';

@Injectable()
export class MigrationTagSeed {
    constructor(
        private readonly tagService: TagService,
    ) {}

    @Command({
        command: 'remove:tag',
        describe: 'remove tags',
    })
    async remove(): Promise<void> {
        try {
            await this.tagService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}