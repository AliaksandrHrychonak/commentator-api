import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserBulkService } from 'src/modules/user/services/user.bulk.service';
import { RoleService } from 'src/modules/role/services/role.service';
import { RoleDocument } from 'src/modules/role/schemas/role.schema';

@Injectable()
export class UserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly userBulkService: UserBulkService,
        private readonly roleService: RoleService
    ) {}

    @Command({
        command: 'insert:user',
        describe: 'insert users',
    })
    async insert(): Promise<void> {
        const superadminRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: 'superadmin',
            });
        const adminRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: 'admin',
            });

        try {
            const password = await this.authService.createPassword(
                process.env.ADMIN_PASSWORD
            );

            await this.userService.create({
                firstName: 'superadmin',
                lastName: 'test',
                email: process.env.SUPER_ADMIN_EMAIL,
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                role: superadminRole._id,
                salt: password.salt,
            });

            await this.userService.create({
                firstName: 'admin',
                lastName: 'test',
                email: process.env.ADMIN_EMAIL,
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                role: adminRole._id,
                salt: password.salt,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:user',
        describe: 'remove users',
    })
    async remove(): Promise<void> {
        try {
            await this.userBulkService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
