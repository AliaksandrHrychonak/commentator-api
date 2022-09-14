import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';
import { UserGetSerialization } from './user.get.serialization';

export class UserListSerialization extends OmitType(UserGetSerialization, [
    'role',
    'passwordExpired',
] as const) {
    @Exclude()
    readonly role: Types.ObjectId;

    @Exclude()
    readonly passwordExpired: Date;
}
