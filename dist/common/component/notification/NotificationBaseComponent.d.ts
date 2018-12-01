import { ViewContainerRef } from '@angular/core';
import { LanguageService } from '../../../language/service/LanguageService';
import { INotificationContent } from '../../../notification/lib/INotificationContent';
export declare class NotificationBaseComponent extends INotificationContent {
    constructor(container: ViewContainerRef, language: LanguageService);
    private clickHandler;
    yesClickHandler(): void;
    notClickHandler(): void;
}
