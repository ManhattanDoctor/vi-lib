export class Base64Source {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    private static PREFIX = 'base64,';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public source: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(source?: string) {
        if (!source) return;

        let index = source.indexOf(Base64Source.PREFIX);
        this.source = index === -1 ? source : source.substr(index + Base64Source.PREFIX.length);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get image(): string {
        return 'data:image/jpeg;base64,' + this.source.replace(/(\r\n|\n|\r)/gm, '');
    }
}
