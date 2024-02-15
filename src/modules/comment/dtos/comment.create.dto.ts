import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsUUID,
    IsOptional,
    IsArray,
    ArrayNotEmpty,
    ArrayMaxSize,
} from 'class-validator';

export class CommentCreateDto {
    @ApiProperty({
        example: faker.string.alphanumeric(50),
        required: true,
    })
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    @Type(() => String)
    readonly name?: string;

    @ApiProperty({
        example: faker.string.alphanumeric(300),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Type(() => String)
    readonly value: string;

    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4')
    readonly owner: string;

    // TODO add ApiProp
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @ArrayNotEmpty()
    @ArrayMaxSize(20)
    @IsUUID('4', { each: true })
    readonly tags?: string[];
}
