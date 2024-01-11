import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsUUID,
} from 'class-validator';

export class CategoryCreateDto {
    @ApiProperty({
        example: faker.string.alphanumeric(10),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @Type(() => String)
    readonly name: string;

    @ApiProperty({
        example: faker.string.alphanumeric(100),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    @Type(() => String)
    readonly description: string;

    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4')
    readonly owner: string;
}
