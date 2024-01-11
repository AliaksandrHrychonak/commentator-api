import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CategoryRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    category: string;
}
