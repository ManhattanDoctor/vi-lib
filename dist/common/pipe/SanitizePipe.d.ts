import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
export declare class SanitizePipe {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string, type?: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
}
