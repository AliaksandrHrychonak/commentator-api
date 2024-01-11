import { Module } from '@nestjs/common';
import { TagRepositoryModule } from './repository/tag.repository.module';
import { TagService } from './services/tag.service';

@Module({
    imports: [TagRepositoryModule],
    exports: [TagService],
    providers: [TagService],
    controllers: [],
})
export class TagModule {}
