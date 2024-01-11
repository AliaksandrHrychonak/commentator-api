import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TagRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    tag: string;
}
