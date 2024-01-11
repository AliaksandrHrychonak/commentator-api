import { PassportStrategy } from '@nestjs/passport';
import { Strategy} from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import {IAuthGithubPayload} from 'src/common/auth/interfaces/auth.interface';

@Injectable()
export class AuthGithubOauth2SignUpStrategy extends PassportStrategy(
    Strategy,
    'githubSignUp'
) {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('auth.githubOAuth2.clientId'),
            clientSecret: configService.get<string>(
                'auth.githubOAuth2.clientSecret'
            ),
            callbackURL: configService.get<string>(
                'auth.githubOAuth2.callbackUrlSignUp'
            ),
            scope: ['read:user', "user:email"],
        });
    }
    // TODO refreshToken undefined
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done
    ): Promise<any> {
        const { displayName, emails } = profile;
        const user: IAuthGithubPayload = {
            email: emails[0].value,
            firstName: displayName.split(' ')[0],
            lastName: displayName.split(' ')[1],
            accessToken,
            refreshToken,
        };


        done(null, user);
    }
}
