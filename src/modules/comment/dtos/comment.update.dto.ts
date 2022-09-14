
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CommentUpdateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(9999)
    @Type(() => String)
    readonly value: string;
}
