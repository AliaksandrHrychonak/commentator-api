import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { TagDatabaseName, TagEntity, TagSchema } from './schemas/tag.schema';
import { TagBulkService } from './services/tag.bulk.service';
import { TagService } from './services/tag.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: TagEntity.name,
                    schema: TagSchema,
                    collection: TagDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [TagService, TagBulkService],
    providers: [TagService, TagBulkService],
    controllers: [],
})
export class TagModule {}