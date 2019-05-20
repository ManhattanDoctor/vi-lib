import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class LanguageMissingTranslationHandler implements MissingTranslationHandler {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {}

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    public handle(params: MissingTranslationHandlerParams): any {
        console.log(params);
        return null;
    }
}
