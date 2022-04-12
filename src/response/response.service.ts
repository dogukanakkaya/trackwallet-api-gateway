import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    throwIfError(result) {
        if ('error' in result) {
            throw new HttpException({ error: result.error }, result.statusCode);
        }
    }
}
