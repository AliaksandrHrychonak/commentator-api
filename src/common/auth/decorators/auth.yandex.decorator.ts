import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthYandexOauth2LoginGuard } from 'src/common/auth/guards/yandex-oauth2/auth.yandex-oauth2-login.guard';
import { AuthYandexOauth2SignUpGuard } from 'src/common/auth/guards/yandex-oauth2/auth.yandex-oauth2-sign-up.guard';

export function AuthYandexOAuth2SignUpProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthYandexOauth2SignUpGuard));
}

export function AuthYandexOAuth2LoginProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthYandexOauth2LoginGuard));
}
