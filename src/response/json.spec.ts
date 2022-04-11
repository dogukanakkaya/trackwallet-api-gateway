import { Json } from './json';

describe('Json', () => {
    it('success()', () => {
        const result = {
            data: {
                items: [1, 2]
            }
        }

        expect(Json.success({ data: result.data })).toStrictEqual(result);
    });

    it('error()', () => {
        const result = {
            error: {
                code: 1,
                message: 'Something went wrong!'
            }
        }

        expect(Json.error({
            error: {
                code: result.error.code,
                message: result.error.message
            }
        })).toStrictEqual(result);
    });
});