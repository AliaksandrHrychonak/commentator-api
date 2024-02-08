import { UserEntity } from '../../user/repository/entities/user.entity';
import { CommentEntity } from '../repository/entities/comment.entity';
import { TagEntity } from '../../tag/repository/entities/tag.entity';

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
