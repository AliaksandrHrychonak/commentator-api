import { faker } from '@faker-js/faker';

export const TagDocParamsId = [
    {
        name: 'tag',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
