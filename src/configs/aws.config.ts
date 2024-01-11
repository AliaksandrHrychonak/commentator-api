import { registerAs } from '@nestjs/config';

export default registerAs(
    'aws',
    (): Record<string, any> => ({
        credential: {
            key: process.env.AWS_CREDENTIAL_KEY,
            secret: process.env.AWS_CREDENTIAL_SECRET,
        },
        s3: {
            bucket: process.env.AWS_S3_BUCKET ?? 'bucket',
            region: process.env.AWS_S3_REGION,
            endpoint: process.env.AWS_S3_ENDPOINT,
            baseUrl: `https://${process.env.AWS_S3_BUCKET}.storage.yandexcloud.net`,
        },
    })
);
