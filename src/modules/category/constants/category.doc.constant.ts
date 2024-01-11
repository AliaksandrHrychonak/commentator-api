import { faker } from '@faker-js/faker';

export const CategoryDocParamsId = [
    {
        name: 'category',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
