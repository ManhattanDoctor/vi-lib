export declare class ApiError implements Error {
    static createSystemError(error: any): ApiError;
    static ERROR_CODE_IDLE_TIMEOUT: number;
    static ERROR_CODE_NO_CONNECTION: number;
    static ERROR_SPECIAL_CODES: Array<number>;
    static DEFAULT_LANGUAGE: string;
    private _code;
    private _name;
    private _message;
    constructor(data: any, language?: string);
    protected parseMessage(data: any, language: string): void;
    readonly code: number;
    readonly name: string;
    readonly message: string;
    readonly isSystem: boolean;
    readonly isSpecial: boolean;
}
