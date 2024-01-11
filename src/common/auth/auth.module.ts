import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthGoogleOAuth2LoginStrategy } from 'src/common/auth/guards/google-oauth2/auth.google-oauth2-login.strategy';
import { AuthGoogleOAuth2SignUpStrategy } from 'src/common/auth/guards/google-oauth2/auth.google-oauth2-sign-up.strategy';
import {AuthYandexOauth2LoginStrategy} from "./guards/yandex-oauth2/auth.yandex-oauth2-login.strategy";
import {AuthYandexOauth2SignUpStrategy} from "./guards/yandex-oauth2/auth.yandex-oauth2-sign-up.strategy";
import {AuthGithubOauth2SignUpStrategy} from "./guards/github-oauth2/auth.github-oauth2-sign-up.strategy";
import {AuthGithubOauth2LoginStrategy} from "./guards/github-oauth2/auth.github-oauth2-login.strategy";
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

        if (
            process.env.SSO_GOOGLE_CLIENT_ID &&
            process.env.SSO_GOOGLE_CLIENT_SECRET
        ) {
            providers.push(AuthGoogleOAuth2LoginStrategy);
            providers.push(AuthGoogleOAuth2SignUpStrategy);
        }

        if (
            process.env.SSO_YANDEX_CLIENT_ID &&
            process.env.SSO_YANDEX_CLIENT_SECRET
        ) {
            providers.push(AuthYandexOauth2LoginStrategy);
            providers.push(AuthYandexOauth2SignUpStrategy);
        }

        if (
            process.env.SSO_GITHUB_CLIENT_ID &&
            process.env.SSO_GITHUB_CLIENT_SECRET
        ) {
            providers.push(AuthGithubOauth2LoginStrategy);
            providers.push(AuthGithubOauth2SignUpStrategy);
        }

        return {
            module: AuthModule,
            providers,
            exports: [],
            controllers: [],
            imports: [],
        };
    }
}
