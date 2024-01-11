import { PickType } from '@nestjs/swagger';
import { CommentCreateDto } from './comment.create.dto';

export class CommentUserCreateDto extends PickType(CommentCreateDto, [
    'name',
    'value',
    'tags',
    'categories',
] as const) {}
