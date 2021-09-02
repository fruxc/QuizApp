export default class fetchError extends Error {
    constructor(errCode, message) {
        super(message);
        this.errCode = errCode;
        this.name = 'fetchError';
    }
}