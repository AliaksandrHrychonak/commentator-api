import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { ApiKeyAdminController } from 'src/common/api-key/controllers/api-key.admin.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TagAdminController } from '../../modules/tag/controllers/tag.admin.controller';
import { TagModule } from '../../modules/tag/tag.module';
import { CategoryAdminController } from '../../modules/category/controllers/category.admin.controller';
import { CategoryModule } from '../../modules/category/category.module';
import { CommentModule } from '../../modules/comment/comment.module';

@Module({
    controllers: [
        SettingAdminController,
        ApiKeyAdminController,
        RoleAdminController,
        UserAdminController,
        TagAdminController,
        CategoryAdminController,
    ],
    providers: [],
    exports: [],
    imports: [
        ApiKeyModule,
        RoleModule,
        UserModule,
        AuthModule,
        TagModule,
        CategoryModule,
        CommentModule,
    ],
})
export class RoutesAdminModule {}
