import { OmitType } from '@nestjs/swagger';
import { CategoryCreateDto } from './category.create.dto';

export class CategoryImportDto extends OmitType(
    CategoryCreateDto,
    [] as const
) {}
