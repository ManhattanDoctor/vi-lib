import { TimeoutError } from 'rxjs';

export class ApiError implements Error {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static createSystemError(error: any): ApiError {
        let data = {} as any;
        if (error.hasOwnProperty('code')) data.code = error.code;
        else data.code = ApiError.ERROR_CODE_NO_CONNECTION;

        if (error.hasOwnProperty('message') && error.message) data.message = error.message;

        if (error instanceof TimeoutError) data.code = ApiError.ERROR_CODE_IDLE_TIMEOUT;

        return new ApiError(data);
    }

    // --------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    // --------------------------------------------------------------------------

    public static ERROR_CODE_IDLE_TIMEOUT: number = -2;
    public static ERROR_CODE_NO_CONNECTION: number = -1;
    public static ERROR_SPECIAL_CODES: Array<number> = [];

    public static DEFAULT_LANGUAGE = 'en';

    // --------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    // --------------------------------------------------------------------------

    protected _code: number = NaN;
    protected _name: string;
    protected _message: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: any, language?: string) {
        if (data.hasOwnProperty('code')) this._code = data.code;

        let message = data;
        if (data.hasOwnProperty('text')) {
            message = data.text;
        } else if (data.hasOwnProperty('message')) {
            message = data.message;
        } else if (data.hasOwnProperty('description')) {
            message = data.description;
        }

        this.parseMessage(message, language);
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected parseMessage(data: any, language: string): void {
        this._message = data;
        if (!(typeof data !== 'object' && typeof data !== 'function')) return;

        if (!language) language = ApiError.DEFAULT_LANGUAGE;

        if (data.hasOwnProperty(language)) this._message = data[language];
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get code(): number {
        return this._code;
    }

    public get name(): string {
        return this._name;
    }

    public get message(): string {
        return this._message;
    }

    public get isSystem(): boolean {
        return this.code === ApiError.ERROR_CODE_NO_CONNECTION || this.code === ApiError.ERROR_CODE_IDLE_TIMEOUT;
    }

    public get isSpecial(): boolean {
        if (isNaN(this._code) || ApiError.ERROR_SPECIAL_CODES.length === 0) return false;

        return ApiError.ERROR_SPECIAL_CODES.indexOf(this._code) !== -1;
    }
}
