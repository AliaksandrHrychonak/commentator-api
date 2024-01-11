import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGithubOauth2LoginGuard } from 'src/common/auth/guards/github-oauth2/auth.github-oauth2-login.guard';
import { AuthGithubOauth2SignUpGuard } from 'src/common/auth/guards/github-oauth2/auth.github-oauth2-sign-up.guard';

export function AuthGithubOAuth2SignUpProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthGithubOauth2SignUpGuard));
}

export function AuthGithubOAuth2LoginProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthGithubOauth2LoginGuard));
}
