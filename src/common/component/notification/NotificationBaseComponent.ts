import { HostListener, ViewContainerRef } from '@angular/core';
import { LanguageService } from '../../../language/service/LanguageService';
import { INotificationContent } from '../../../notification/lib/INotificationContent';
import { IQuestion } from '../../IQuestion';

export class NotificationBaseComponent extends INotificationContent {
    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, language: LanguageService) {
        super(container, language);
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('click')
    private clickHandler(): void {
        if (this.mode == 'info') this.remove();
    }

    public yesClickHandler(): void {
        if (this.config && this.config.yesCallback) this.config.yesCallback();

        this.promiseResolve();
        this.emit(IQuestion.EVENT_YES);
        this.remove();
    }

    public notClickHandler(): void {
        if (this.config && this.config.noCallback) this.config.noCallback();

        this.promiseReject('No clicked');
        this.emit(IQuestion.EVENT_NOT);
        this.remove();
    }
}
