import { Type } from 'class-transformer';
import { IsMongoId, } from 'class-validator';

export class CommentUpdateTagDto {
    @IsMongoId({ each: true })
    @Type(() => String)
    readonly tag: string;
}
