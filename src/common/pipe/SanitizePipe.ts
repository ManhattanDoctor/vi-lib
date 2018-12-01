import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'viSanitize'
})
export class SanitizePipe {
    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private sanitizer: DomSanitizer) {}

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public transform(value: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        if (!value) return value;

        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);

            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);

            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);

            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);

            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);

            default:
                throw new Error('Invalid safe type specified: ' + type);
        }
    }
}
