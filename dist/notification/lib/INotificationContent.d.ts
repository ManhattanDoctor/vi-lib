import { AfterViewInit, ViewContainerRef } from '@angular/core';
import { QuestionBaseComponent } from '../../common/component/window/QuestionBaseComponent';
import { LanguageService } from '../../language/service/LanguageService';
import { INotification } from './INotification';
import { NotificationConfig } from './NotificationConfig';
export declare abstract class INotificationContent extends QuestionBaseComponent implements AfterViewInit {
    protected language: LanguageService;
    protected timer: any;
    protected _notification: INotification;
    constructor(container: ViewContainerRef, language: LanguageService);
    protected commitNotificationProperties(): void;
    protected timerHandler: () => void;
    close(): void;
    remove(): void;
    emit(event: string): void;
    destroy(): void;
    ngAfterViewInit(): void;
    handleCloseClick(): void;
    readonly data: any;
    readonly config: NotificationConfig;
    notification: INotification;
}
