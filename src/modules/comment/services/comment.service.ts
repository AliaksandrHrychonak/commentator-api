import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { TagEntity } from 'src/modules/tag/repository/entities/tag.entity';
import { ICommentService } from 'src/modules/comment/interfaces/comment.service.interface';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/modules/comment/repository/repositories/comment.repository';
import {
    IDatabaseCreateManyOptions,
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/modules/../common/database/interfaces/database.interface';
import { ICommentDoc, ICommentEntity } from 'src/modules/comment/interfaces/comment.interface';
import { CommentCreateDto } from 'src/modules/comment/dtos/comment.create.dto';
import {
    CommentDoc,
    CommentEntity,
} from 'src/modules/comment/repository/entities/comment.entity';
import { CommentUpdateDto } from 'src/modules/comment/dtos/comment.update.dto';
import { CommentImportDto } from 'src/modules/comment/dtos/comment.import.dto';

@Injectable()
export class CommentService implements ICommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ICommentEntity[]> {
        return this.commentRepository.findAll<ICommentEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.commentRepository.findOneById<T>(_id, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.commentRepository.findOne<T>(find, options);
    }

    async findOneByName<T>(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.commentRepository.findOne<T>({ name }, options);
    }

    async create(
        { name, value, owner, tags }: CommentCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CommentDoc> {
        const create: CommentEntity = new CommentEntity();
        create.name = name;
        create.value = value;
        create.owner = owner;
        create.tags = tags;

        return this.commentRepository.create<CommentEntity>(create, options);
    }

    async delete(
        repository: CommentDoc,
        options?: IDatabaseSaveOptions
    ): Promise<CommentDoc> {
        return this.commentRepository.softDelete(repository, options);
    }

    async update(
        repository: CommentDoc,
        { name, value, tags }: CommentUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<CommentDoc> {
        repository.name = name;
        repository.value = value;
        repository.tags = tags;

        return this.commentRepository.save(repository, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.commentRepository.getTotal(find, {
            ...options,
            join: true,
        });
    }

    async joinWithData(repository: CommentDoc): Promise<ICommentDoc> {
        return repository.populate([
            {
                path: 'owner',
                localField: 'user',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'tags',
                localField: 'tag',
                foreignField: '_id',
                model: TagEntity.name,
            },
        ]);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.commentRepository.deleteMany(find, options);
    }

    async import(
        data: CommentImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean> {
        const comments: CommentEntity[] = data.map(({ name, value, owner, tags }) => {
            const create: CommentEntity = new CommentEntity();
            create.name = name;
            create.value = value;
            create.owner = owner;
            create.tags = tags.split(',');

            return create;
        });

        return this.commentRepository.createMany<CommentEntity>(
            comments,
            options
        );
    }
}
