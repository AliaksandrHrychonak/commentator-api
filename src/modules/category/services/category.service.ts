import { ICategoryService } from '../interfaces/category.service.interface';
import { Injectable } from '@nestjs/common';

import {
    IDatabaseCreateManyOptions,
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from '../../../common/database/interfaces/database.interface';
import {
    ICategoryDoc,
    ICategoryEntity,
} from '../interfaces/category.interface';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { CategoryUpdateDto } from '../dtos/category.update.dto';
import { UserEntity } from '../../user/repository/entities/user.entity';
import { CategoryImportDto } from '../dtos/category.import.dto';

import {
    CategoryDoc,
    CategoryEntity,
} from '../repository/entities/category.entity';
import { CategoryRepository } from '../repository/repositories/category.repository';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ICategoryEntity[]> {
        return this.categoryRepository.findAll<ICategoryEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.categoryRepository.findOneById<T>(_id, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.categoryRepository.findOne<T>(find, options);
    }

    async findOneByName<T>(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.categoryRepository.findOne<T>({ name }, options);
    }

    async create(
        { name, description, owner }: CategoryCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CategoryDoc> {
        const create: CategoryEntity = new CategoryEntity();
        create.name = name;
        create.description = description;
        create.owner = owner;

        return this.categoryRepository.create<CategoryEntity>(create, options);
    }

    async delete(
        repository: CategoryDoc,
        options?: IDatabaseSaveOptions
    ): Promise<CategoryDoc> {
        return this.categoryRepository.softDelete(repository, options);
    }

    async update(
        repository: CategoryDoc,
        { name, description }: CategoryUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<CategoryDoc> {
        repository.name = name;
        repository.description = description;

        return this.categoryRepository.save(repository, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.categoryRepository.getTotal(find, {
            ...options,
            join: true,
        });
    }

    async joinWithOwner(repository: CategoryDoc): Promise<ICategoryDoc> {
        return repository.populate({
            path: 'owner',
            localField: 'user',
            foreignField: '_id',
            model: UserEntity.name,
        });
    }

    async belongByOwnerId(
        categories: string[],
        owner: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        console.log();
        if (!categories) {
            return undefined;
        }

        const search: Record<string, any> = categories.map((i) => {
            return { _id: i };
        });
        const find: Record<string, any> = {
            $or: search,
            owner,
        };
        return this.categoryRepository.exists(find, options);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.categoryRepository.deleteMany(find, options);
    }

    async import(
        data: CategoryImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean> {
        const categories: CategoryEntity[] = data.map(
            ({ name, description, owner }) => {
                const create: CategoryEntity = new CategoryEntity();
                create.name = name;
                create.description = description;
                create.owner = owner;

                return create;
            }
        );

        return this.categoryRepository.createMany<CategoryEntity>(
            categories,
            options
        );
    }
}
