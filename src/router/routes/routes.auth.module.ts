import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TagAuthController } from 'src/modules/tag/controllers/tag.auth.controller';
import { TagModule } from 'src/modules/tag/tag.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { CommentAuthController } from 'src/modules/comment/controllers/comment.auth.controller';

@Module({
    controllers: [
        UserAuthController,
        TagAuthController,
        CommentAuthController,
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        TagModule,
        CommentModule,
    ],
})
export class RoutesAuthModule {}
