import { UserEntity } from '../../user/repository/entities/user.entity';
import { CommentEntity } from '../repository/entities/comment.entity';
import { TagEntity } from '../../tag/repository/entities/tag.entity';
import { CategoryEntity } from '../../category/repository/entities/category.entity';

export interface ICommentEntity
    extends Omit<CommentEntity, 'owner' | 'tags' | 'categories'> {
    owner: UserEntity;
    tags?: TagEntity[];
    categories?: CategoryEntity[];
}

export interface ICommentDoc
    extends Omit<CommentEntity, 'owner' | 'tags' | 'categories'> {
    owner: UserEntity;
    tags?: TagEntity[];
    categories?: CategoryEntity[];
}
