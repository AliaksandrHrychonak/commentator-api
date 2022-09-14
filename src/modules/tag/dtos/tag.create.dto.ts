import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class TagCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Type(() => String)
    readonly name: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly owner: string;

}
