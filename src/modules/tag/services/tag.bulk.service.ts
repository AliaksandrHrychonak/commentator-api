import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { TagDocument, TagEntity } from '../schemas/tag.schema';


@Injectable()
export class TagBulkService {
    constructor(
        @DatabaseEntity(TagEntity.name)
        private readonly tagModel: Model<TagDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.tagModel.deleteMany(find);
    }
}
