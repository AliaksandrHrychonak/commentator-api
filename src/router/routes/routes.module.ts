import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { CommentController } from 'src/modules/comment/controllers/comment.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleModule } from 'src/modules/role/role.module';
import { TagController } from 'src/modules/tag/controllers/tags.controller';
import { TagModule } from 'src/modules/tag/tag.module';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from '../../common/auth/controllers/auth.controller';

@Module({
    controllers: [
        SettingController,
        UserController,
        HealthController,
        AuthController,
        TagController,
        CommentController
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        PermissionModule,
        RoleModule,
        HealthModule,
        TerminusModule,
        HttpModule,
        TagModule,
        CommentModule
    ],
})
export class RoutesModule {}
