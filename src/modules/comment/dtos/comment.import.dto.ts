import { OmitType } from '@nestjs/swagger';
import { CommentCreateDto } from './comment.create.dto';

export class CommentImportDto extends OmitType(CommentCreateDto, ["tags"] as const) {
    tags?: string;
}
