import { UserEntity } from '../../user/repository/entities/user.entity';
import { CommentEntity } from '../../comment/repository/entities/comment.entity';

export interface ICategoryEntity extends Omit<CommentEntity, 'owner'> {
    owner: UserEntity;
}

export interface ICategoryDoc extends Omit<CommentEntity, 'owner'> {
    owner: UserEntity;
}
