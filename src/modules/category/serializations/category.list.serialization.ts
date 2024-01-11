import { CategoryGetSerialization } from './category.get.serialization';
import { OmitType } from '@nestjs/swagger';

export class CategoryListSerialization extends OmitType(
    CategoryGetSerialization,
    [] as const
) {}
