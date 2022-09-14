import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CommentRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    comment: string;
}
