export declare class Language {
    private _name;
    private _locale;
    constructor(locale?: string, name?: string);
    toEqual(value: Language | string): boolean;
    readonly id: string;
    readonly locale: string;
    readonly name: string;
}
