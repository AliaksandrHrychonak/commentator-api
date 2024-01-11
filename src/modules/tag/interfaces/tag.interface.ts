import {
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import {TagEntity} from "../repository/entities/tag.entity";

export interface ITagEntity extends Omit<TagEntity, 'owner'> {
    owner: UserEntity;
}

export interface ITagDoc extends Omit<TagEntity, 'owner'> {
    owner: UserEntity;
}

