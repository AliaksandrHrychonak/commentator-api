import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CommentRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    comment: string;
}
