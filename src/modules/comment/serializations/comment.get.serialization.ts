import { Exclude, Transform, Type } from 'class-transformer';
import { TagDocument } from 'src/modules/tag/schemas/tag.schema';
import { ITagDocument } from 'src/modules/tag/tag.interface';

export class CommentGetSerialization {
    @Type(() => String)
    readonly _id: string;

    @Transform(({ obj }) =>
        obj.tags.map((val: TagDocument) => ({
            _id: `${val._id}`,
            name: val.name,
        }))
    )
    readonly tags: ITagDocument;

    readonly value: string;

    @Exclude()
    readonly owner: string;
   
    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
