import { PickType } from '@nestjs/swagger';
import { CategoryCreateDto } from './category.create.dto';

export class CategoryUserCreateDto extends PickType(CategoryCreateDto, [
    'name',
    'description',
] as const) {}
