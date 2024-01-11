import { CategoryGetSerialization } from './category.get.serialization';
import { OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CategoryListExportSerialization extends OmitType(
    CategoryGetSerialization,
    ['owner'] as const
) {
    @Transform(({ value }) => value._id)
    owner: string;
}
