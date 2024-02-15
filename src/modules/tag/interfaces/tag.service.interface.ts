import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseManyOptions,
    IDatabaseCreateManyOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { TagCreateDto } from 'src/modules/tag/dtos/tag.create.dto';
import { TagDoc } from 'src/modules/tag/repository/entities/tag.entity';
import { TagUpdateDto } from 'src/modules/tag/dtos/tag.update.dto';
import { ITagDoc, ITagEntity } from './tag.interface';
import { TagImportDto } from 'src/modules/tag/dtos/tag.import.dto';

export interface ITagService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ITagEntity[]>;
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
        { name, description, owner }: TagCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<TagDoc>;
    delete(repository: TagDoc, options?: IDatabaseSaveOptions): Promise<TagDoc>;
    update(
        repository: TagDoc,
        { name, description }: TagUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<TagDoc>;
    joinWithOwner(repository: TagDoc): Promise<ITagDoc>;
    import(
        data: TagImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
