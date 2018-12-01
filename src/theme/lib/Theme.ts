export class Theme {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    public name: string;
    public isDark: boolean;

    public styles: any;
    public styleName: string;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        this.styles = {} as any;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public getStyle(name: string): any {
        return this.styles ? this.styles[name] : null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public update(data: any): void {
        if (data.hasOwnProperty('name')) {
            this.name = data.name;
            if (!this.styleName) this.styleName = this.name + '-theme';
        }

        if (data.hasOwnProperty('styles')) this.styles = data.styles;

        if (data.hasOwnProperty('isDark')) this.isDark = data.isDark;

        if (data.hasOwnProperty('styleName')) this.styleName = data.name;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return this.name;
    }
}
