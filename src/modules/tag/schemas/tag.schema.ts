import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { UserEntity } from 'src/modules/user/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class TagEntity {
    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true,
    })
    name: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name,
    })
    owner: Types.ObjectId;

}

export const TagDatabaseName = 'tags';
export const TagSchema = SchemaFactory.createForClass(TagEntity);

export type TagDocument = TagEntity & Document;

// Hooks
TagSchema.pre<TagDocument>('save', function (next) {
    this.name = this.name.toLowerCase();
    next();
});
