import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { CommentDocument, CommentEntity } from '../schemas/comment.schema';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/database.interface';
import { TagEntity } from 'src/modules/tag/schemas/tag.schema';
import { CommentCreateDto } from '../dtos/comment.create.dto';
import { TagService } from 'src/modules/tag/services/tag.service';
import { ICommentCreate } from '../comment.interface';

@Injectable()
export class CommentService {
    private readonly uploadPath: string;

    constructor(
        @DatabaseEntity(CommentEntity.name)
        private readonly commentModel: Model<CommentDocument>,
        private readonly helperStringService: HelperStringService
    ) {}
    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CommentDocument[]> {
        const comments = this.commentModel.find(find).populate({
            path: 'tags',
            model: TagEntity.name,
        });
       

        // if (
        //     options &&
        //     options.limit !== undefined &&
        //     options.skip !== undefined
        // ) {
        //     comments.limit(options.limit).skip(options.skip);
        // }

        if (options && options.sort) {
            comments.sort(options.sort);
        }
        return comments.lean();
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.commentModel.countDocuments(find);
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const comment = this.commentModel.findById(_id);

        if (options && options.populate && options.populate.tags) {
            comment.populate({
                path: 'tags',
                model: TagEntity.name,
            });
        }

        return comment.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const comment = this.commentModel.findOne(find);

        if (options && options.populate && options.populate.tags) {
            comment.populate({
                path: 'tags',
                model: TagEntity.name,
            });
        }

        return comment.lean();
    }

    async create(
        value: string,
        owner: string,
        tags?: Types.ObjectId[]
    ): Promise<CommentDocument> {
        const comment: ICommentCreate = {
            value,
            owner: new Types.ObjectId(owner),
            tags: tags ? tags.map((val) => new Types.ObjectId(val)) : [],
        };
     
        const create: CommentDocument = new this.commentModel(comment);
        return create.save();
    }

    async deleteOneById(_id: string): Promise<CommentDocument> {
        return this.commentModel.findByIdAndDelete(_id);
    }

    async deleteOne(find: Record<string, any>): Promise<CommentDocument> {
        return this.commentModel.findOneAndDelete(find);
    }

    async update(
        _id: string,
        value: string,
    ): Promise<CommentDocument> {
        const update: CommentDocument = await this.commentModel.findById(_id);
        update.value = value;
        return update.save();
    }

    async updateTags(id: string, tag: string): Promise<CommentDocument> {
        const update = await this.commentModel.findByIdAndUpdate(id, {
            $addToSet: { tags: new Types.ObjectId(tag) },
        }, { new: true },)

        return update
    }

    async removeTags(id: string, tag: string): Promise<CommentDocument> {
        const update = await this.commentModel.findByIdAndUpdate(id, {
            $pull: { tags: new Types.ObjectId(tag) },
        }, { new: true })

        return update
    }
}
