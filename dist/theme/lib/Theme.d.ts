export declare class Theme {
    name: string;
    isDark: boolean;
    styles: any;
    styleName: string;
    constructor();
    getStyle(name: string): any;
    update(data: any): void;
    readonly id: string;
}
