import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthJwtAccessStrategy } from 'src/common/auth/guards/jwt-access/auth.jwt-access.strategy';
import { AuthJwtRefreshStrategy } from 'src/common/auth/guards/jwt-refresh/auth.jwt-refresh.strategy';
import { AuthService } from 'src/common/auth/services/auth.service';

@Module({
    providers: [AuthService],
    exports: [AuthService],
    controllers: [],
    imports: [],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        const providers: Provider<any>[] = [
            AuthJwtAccessStrategy,
            AuthJwtRefreshStrategy,
        ];

        return {
            module: AuthModule,
            providers,
            exports: [],
            controllers: [],
            imports: [],
        };
    }
}
