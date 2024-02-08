import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { MigrationApiKeySeed } from 'src/migration/seeds/migration.api-key.seed';
import { MigrationSettingSeed } from 'src/migration/seeds/migration.setting.seed';
import { MigrationRoleSeed } from 'src/migration/seeds/migration.role.seed';
import { MigrationUserSeed } from 'src/migration/seeds/migration.user.seed';
import { TagModule } from '../modules/tag/tag.module';
import { MigrationTagSeed } from './seeds/migration.tag.seed';
import { MigrationCommentSeed } from './seeds/migration.comment.seed';
import { CommentModule } from '../modules/comment/comment.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        ApiKeyModule,
        AuthModule,
        RoleModule,
        UserModule,
        CommentModule,
        TagModule
    ],
    providers: [
        MigrationApiKeySeed,
        MigrationSettingSeed,
        MigrationRoleSeed,
        MigrationUserSeed,
        MigrationTagSeed,
        MigrationCommentSeed
    ],
    exports: [],
})
export class MigrationModule {}
