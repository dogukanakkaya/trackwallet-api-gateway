import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';


describe('ResponseService', () => {
    let service: ResponseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ResponseService],
        }).compile();

        service = module.get<ResponseService>(ResponseService);
    });

    it('should throw an error if result has error key', () => {
        const result = {
            error: {
                message: 'error message'
            },
            statusCode: 401
        }

        try {
            expect(service.throwIfError(result)).toThrow(HttpException);
        } catch ({ error }) {
            expect(error).toStrictEqual(error);
        }
    });

    it('should do nothing if error key not exists in result', () => {
        const result = {
            data: {}
        }

        expect(service.throwIfError(result)).toBeUndefined();
    });
});
