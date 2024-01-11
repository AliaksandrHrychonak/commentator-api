import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {TagEntity, TagSchema} from "./entities/tag.entity";
import {TagRepository} from "./repositories/tag.repository";

@Module({
    providers: [TagRepository],
    exports: [TagRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: TagEntity.name,
                    schema: TagSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class TagRepositoryModule {}
