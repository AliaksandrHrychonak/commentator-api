import { PassportStrategy } from '@nestjs/passport';
import { Strategy} from 'passport-yandex';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import {IAuthYandexPayload} from 'src/common/auth/interfaces/auth.interface';

@Injectable()
export class AuthYandexOauth2SignUpStrategy extends PassportStrategy(
    Strategy,
    'yandexSignUp'
) {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('auth.yandexOAuth2.clientId'),
            clientSecret: configService.get<string>(
                'auth.yandexOAuth2.clientSecret'
            ),
            callbackURL: configService.get<string>(
                'auth.yandexOAuth2.callbackUrlSignUp'
            ),
            // scope: ['profile', 'email', 'openid'], TODO add scope
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done
    ): Promise<any> {
        const { name, emails } = profile;

        const user: IAuthYandexPayload = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
            refreshToken,
        };

        done(null, user);
    }
}
