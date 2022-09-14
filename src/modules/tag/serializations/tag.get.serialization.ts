import { Exclude, Type } from 'class-transformer';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

export class TagGetSerialization {
    @Type(() => String)
    readonly _id: string;

    readonly name: string;

    readonly owner: UserDocument;

    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
