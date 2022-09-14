import { UserDocument } from '../user/schemas/user.schema';
import { IUserDocument } from '../user/user.interface';
import { TagCreateDto } from './dtos/tag.create.dto';


export interface ITagDocument extends Omit<UserDocument, 'users'> {
    owner: IUserDocument;
}

