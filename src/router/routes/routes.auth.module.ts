import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TagAuthController } from '../../modules/tag/controllers/tag.auth.controller';
import { TagModule } from '../../modules/tag/tag.module';
import { CategoryModule } from '../../modules/category/category.module';
import { CategoryAuthController } from '../../modules/category/controllers/category.auth.controller';
import { CommentModule } from '../../modules/comment/comment.module';
import { CommentAuthController } from '../../modules/comment/controllers/comment.auth.controller';

@Module({
    controllers: [
        UserAuthController,
        TagAuthController,
        CategoryAuthController,
        CommentAuthController,
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        TagModule,
        CategoryModule,
        CommentModule,
    ],
})
export class RoutesAuthModule {}
