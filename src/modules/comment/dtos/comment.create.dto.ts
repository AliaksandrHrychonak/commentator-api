import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsMongoId,
    ArrayNotEmpty,
    IsArray,
    IsOptional,
    ArrayUnique,
} from 'class-validator';
import { Types } from 'mongoose';
import { TagDocument } from 'src/modules/tag/schemas/tag.schema';


export class CommentCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(9999)
    @Type(() => String)
    readonly value: string;

    @IsOptional()
    @IsMongoId({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    readonly tags: Types.ObjectId[];
}
