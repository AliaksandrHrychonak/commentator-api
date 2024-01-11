import { faker } from '@faker-js/faker';

export const CommentDocParamsId = [
    {
        name: 'comment',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
