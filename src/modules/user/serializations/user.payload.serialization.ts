import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from './user.get.serialization';

export class UserPayloadSerialization extends OmitType(UserGetSerialization, [
] as const) {
}
