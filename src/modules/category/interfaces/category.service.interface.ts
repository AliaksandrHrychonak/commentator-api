import { ICategoryDoc, ICategoryEntity } from './category.interface';
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
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { CategoryUpdateDto } from '../dtos/category.update.dto';
import { CategoryImportDto } from '../dtos/category.import.dto';
import { CategoryDoc } from '../repository/entities/category.entity';

export interface ICategoryService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ICategoryEntity[]>;
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T>;
    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    findOneByName<T>(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    create(
        { name, description, owner }: CategoryCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CategoryDoc>;
    delete(
        repository: CategoryDoc,
        options?: IDatabaseSaveOptions
    ): Promise<CategoryDoc>;
    update(
        repository: CategoryDoc,
        { name, description }: CategoryUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<CategoryDoc>;
    joinWithOwner(repository: CategoryDoc): Promise<ICategoryDoc>;
    belongByOwnerId(
        categories: string[],
        owner: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean>;
    import(
        data: CategoryImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
