import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material';
import { ApiError } from '../../common/api/ApiError';
import { ObservableData } from '../../common/observer/ObservableData';
import { LanguageService } from '../../language/service/LanguageService';
import { WindowAlign } from '../../window/lib/WindowConfig';
import { INotification } from '../lib/INotification';
import { INotificationContent } from '../lib/INotificationContent';
import { NotificationConfig } from '../lib/NotificationConfig';
import { NotificationFactory } from '../lib/NotificationFactory';
export declare class NotificationService {
    private dialog;
    private language;
    static GAP: number;
    static DEFAULT_INFO_ICON_ID: string;
    static DEFAULT_ERROR_ICON_ID: string;
    static DEFAULT_INFO_DURATION: number;
    static DEFAULT_ERROR_DURATION: number;
    static DEFAULT_PADDING_TOP: number;
    static DEFAULT_PADDING_LEFT: number;
    static DEFAULT_PADDING_RIGHT: number;
    static DEFAULT_PADDING_BOTTOM: number;
    static DEFAULT_MIN_WIDTH: number;
    static DEFAULT_MIN_HEIGHT: number;
    static DEFAULT_VERTICAL_ALIGN: WindowAlign;
    static DEFAULT_HORIZONTAL_ALIGN: WindowAlign;
    factory: NotificationFactory<INotification>;
    defaultNotification: ComponentType<INotificationContent>;
    protected _configs: Array<NotificationConfig>;
    protected _notifications: Map<NotificationConfig, INotificationContent>;
    private observer;
    constructor(dialog: MatDialog, language: LanguageService);
    private get;
    openNotification(component: ComponentType<INotificationContent>, config: NotificationConfig): INotificationContent;
    add(config: NotificationConfig, content: INotificationContent): void;
    remove(config: NotificationConfig): void;
    removeById(id: string): void;
    private close;
    private checkNotificationPosition;
    private hasNotificationWithSamePosition;
    open(config: NotificationConfig): INotificationContent;
    errorTranslate(translationId: string, translation?: any): void;
    error(error: Error | ApiError | string): void;
    infoTranslate(translationId: string, translation?: any, picture?: string, closeDuration?: number, removeAfterClose?: boolean, iconId?: string): void;
    info(text: string, picture?: string, closeDuration?: number, removeAfterClose?: boolean, iconId?: string): void;
    readonly events: Observable<ObservableData<NotificationServiceEvent, NotificationConfig | INotification>>;
    readonly notifications: Map<NotificationConfig, INotificationContent>;
    readonly configs: Array<NotificationConfig>;
}
export declare enum NotificationServiceEvent {
    OPENED = "OPENED",
    CLOSED = "CLOSED",
    ADDED = "ADDED",
    REMOVED = "REMOVED"
}
