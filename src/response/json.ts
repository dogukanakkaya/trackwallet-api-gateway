// i might add specific | global data like status for all responses
// that's why i created this class
export class Json {
    static success<T = unknown>(data: T) {
        return {
            ...data
        };
    }

    static error<T = unknown>(data: T) {
        return {
            ...data
        };
    }
}