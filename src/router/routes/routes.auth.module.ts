import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TagAuthController } from '../../modules/tag/controllers/tag.auth.controller';
import { TagModule } from '../../modules/tag/tag.module';

@Module({
    controllers: [UserAuthController, TagAuthController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule, AwsModule, TagModule],
})
export class RoutesAuthModule {}
