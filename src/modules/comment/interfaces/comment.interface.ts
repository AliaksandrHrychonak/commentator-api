import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { CommentEntity } from 'src/modules/comment/repository/entities/comment.entity';
import { TagEntity } from 'src/modules/tag/repository/entities/tag.entity';

export interface ICommentEntity
    extends Omit<CommentEntity, 'owner' | 'tags'> {
    owner: UserEntity;
    tags?: TagEntity[];
}

export interface ICommentDoc
    extends Omit<CommentEntity, 'owner' | 'tags'> {
    owner: UserEntity;
    tags?: TagEntity[];
}
