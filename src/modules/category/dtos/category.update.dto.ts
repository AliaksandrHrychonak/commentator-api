import { PickType } from '@nestjs/swagger';
import { CategoryCreateDto } from './category.create.dto';

export class CategoryUpdateDto extends PickType(CategoryCreateDto, [
    'name',
    'description',
] as const) {}
