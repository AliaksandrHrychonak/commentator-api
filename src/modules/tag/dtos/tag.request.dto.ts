import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class TagRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    tag: string;
}
