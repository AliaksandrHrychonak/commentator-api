import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { ApiKeyAdminController } from 'src/common/api-key/controllers/api-key.admin.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TagAdminController } from 'src/modules/tag/controllers/tag.admin.controller';
import { TagModule } from 'src/modules/tag/tag.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import {CommentAdminController} from "src/modules/comment/controllers/comment.admin.controller";

@Module({
    controllers: [
        SettingAdminController,
        ApiKeyAdminController,
        RoleAdminController,
        UserAdminController,
        TagAdminController,
        CommentAdminController
    ],
    providers: [],
    exports: [],
    imports: [
        ApiKeyModule,
        RoleModule,
        UserModule,
        AuthModule,
        TagModule,
        CommentModule,
    ],
})
export class RoutesAdminModule {}
