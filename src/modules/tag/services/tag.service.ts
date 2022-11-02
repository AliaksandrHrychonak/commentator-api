import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IDatabaseFindAllOptions, IDatabaseFindOneOptions } from 'src/common/database/database.interface';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/schemas/user.schema';
import { string } from 'yargs';
import { TagCreateDto } from '../dtos/tag.create.dto';
import { TagDocument, TagEntity } from '../schemas/tag.schema';


@Injectable()
export class TagService {
    constructor(
        @DatabaseEntity(TagEntity.name)
        private readonly tagModel: Model<TagDocument>
    ) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TagDocument[]> {
        
        const tags = this.tagModel.find(find);
        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            tags.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            tags.sort(options.sort);
        }

        return tags.lean();
    }

    async findAllMe(
        id: string
    ): Promise<TagDocument[]> {
        
        return this.tagModel.find({ owner: id })
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.tagModel.countDocuments(find);
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const tags = this.tagModel.findById(_id);

        if (options && options.populate && options.populate.owner) {
            tags.populate({
                path: 'users',
                model: UserEntity.name,
            });
        }
        
        return tags.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const tag = this.tagModel.findOne(find);

        if (options && options.populate && options.populate.owner) {
            tag.populate({
                path: 'users',
                model: UserEntity.name,
            });
        }

        return tag.lean();
    }

    async exists(name: string, user: string, _id?: string, ): Promise<boolean> {
        const exist = await this.tagModel.exists({
            name: {
                $regex: new RegExp(name),
                $options: 'i',
            },
            owner: new Types.ObjectId(user),
            _id: { $nin: new Types.ObjectId(_id) },
        });      

        return exist ? true : false;
    }

    async create({
        name,
        owner
    }: TagCreateDto): Promise<TagDocument> {
        const create: TagDocument = new this.tagModel({
            name: name,
            owner: new Types.ObjectId(owner),
        });

        return create.save();
    }


    async deleteOneById(_id: string): Promise<TagDocument> {
        return this.tagModel.findByIdAndDelete(_id);
    }
    async deleteOne(find: Record<string, any>): Promise<TagDocument> {
        return this.tagModel.findOneAndDelete(find);
    }
}
