import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { ApiError } from '../../common/api/ApiError';
import { Assets } from '../../common/asset/Assets';
import { ObservableData } from '../../common/observer/ObservableData';
import { ArrayUtil } from '../../common/util/ArrayUtil';
import { LanguageService } from '../../language/service/LanguageService';
import { WindowAlign } from '../../window/lib/WindowConfig';
import { INotification } from '../lib/INotification';
import { INotificationContent } from '../lib/INotificationContent';
import { NotificationConfig } from '../lib/NotificationConfig';
import { NotificationFactory } from '../lib/NotificationFactory';

@Injectable()
export class NotificationService {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    public static GAP = 25;

    public static DEFAULT_INFO_ICON_ID: string = 'error_outline';
    public static DEFAULT_ERROR_ICON_ID: string = 'info_outline';

    public static DEFAULT_INFO_DURATION: number = 5000;
    public static DEFAULT_ERROR_DURATION: number = 5000;

    public static DEFAULT_PADDING_TOP = 25;
    public static DEFAULT_PADDING_LEFT = 25;
    public static DEFAULT_PADDING_RIGHT = 25;
    public static DEFAULT_PADDING_BOTTOM = 25;

    public static DEFAULT_MIN_WIDTH = 25;
    public static DEFAULT_MIN_HEIGHT = 25;

    public static DEFAULT_VERTICAL_ALIGN: WindowAlign = 'start';
    public static DEFAULT_HORIZONTAL_ALIGN: WindowAlign = 'end';

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public factory: NotificationFactory<INotification>;
    public defaultNotification: ComponentType<INotificationContent>;

    protected _configs: Array<NotificationConfig>;
    protected _notifications: Map<NotificationConfig, INotificationContent>;

    private observer: Subject<ObservableData<NotificationServiceEvent, NotificationConfig | INotification>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private dialog: MatDialog, private language: LanguageService) {
        this._configs = [];
        this._notifications = new Map();

        this.observer = new Subject();
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private get(id: string): NotificationConfig {
        let result: NotificationConfig = null;

        if (this._configs.length > 0) {
            this._configs.some(item => {
                if (item.id === id) {
                    result = item;
                    return true;
                }
            });
        }

        if (!result && this.notifications.size > 0) {
            this.notifications.forEach((content, config) => {
                if (config.id === id) result = config;
            });
        }

        return result;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public openNotification(component: ComponentType<INotificationContent>, config: NotificationConfig): INotificationContent {
        let notification: INotification = null;
        if (config.id) {
            notification = this.notifications[config.id];
            if (notification) {
                return notification.content;
            }
        }

        if (!config.defaultMinWidth) {
            config.defaultMinWidth = NotificationService.DEFAULT_MIN_WIDTH;
        }
        if (!config.defaultMinHeight) {
            config.defaultMinHeight = NotificationService.DEFAULT_MIN_HEIGHT;
        }

        if (!config.verticalAlign) {
            config.verticalAlign = NotificationService.DEFAULT_VERTICAL_ALIGN;
        }
        if (!config.horizontalAlign) {
            config.horizontalAlign = NotificationService.DEFAULT_HORIZONTAL_ALIGN;
        }

        if (isNaN(config.paddingTop)) {
            config.paddingTop = NotificationService.DEFAULT_PADDING_TOP;
        }
        if (isNaN(config.paddingLeft)) {
            config.paddingLeft = NotificationService.DEFAULT_PADDING_LEFT;
        }
        if (isNaN(config.paddingRight)) {
            config.paddingRight = NotificationService.DEFAULT_PADDING_RIGHT;
        }
        if (isNaN(config.paddingBottom)) {
            config.paddingBottom = NotificationService.DEFAULT_PADDING_BOTTOM;
        }

        config.setDefaultProperties();

        let reference: MatDialogRef<INotificationContent> = this.dialog.open(component, config);
        notification = this.factory.create(reference, config, (reference as any)._overlayRef) as INotification;

        let content: INotificationContent = notification.content;
        let subscription: Subscription = notification.events.subscribe(data => {
            if (data === INotification.EVENT_REMOVED) {
                subscription.unsubscribe();
                this.remove(config);
            } else if (data === INotification.EVENT_CLOSED) {
                this.close(config);
            } else if (data === INotification.EVENT_OPENED) {
                this.add(config, reference.componentInstance);
                this.checkNotificationPosition(notification);

                if (config.sound) Assets.playSound(config.sound);
            }
        });

        return content;
    }

    public add(config: NotificationConfig, content: INotificationContent): void {
        if (content) {
            this._configs.push(config);
            this.observer.next(new ObservableData(NotificationServiceEvent.ADDED, config));
        }

        this._notifications.set(config, content);
        this.observer.next(new ObservableData(NotificationServiceEvent.OPENED, content.notification));
    }

    public remove(config: NotificationConfig): void {
        this.close(config);
        ArrayUtil.remove(this._configs, config);
        this.observer.next(new ObservableData(NotificationServiceEvent.REMOVED, config));
        config.destroy();
    }

    public removeById(id: string): void {
        if (this._configs.length > 0) {
            return;
        }

        this._configs.forEach(config => {
            if (config.id && config.id === id) this.remove(config);
        });
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private close(config: NotificationConfig): INotification {
        let item = this._notifications.get(config);
        if (!item) {
            return null;
        }

        item.close();
        this._notifications.delete(config);
        this.observer.next(new ObservableData(NotificationServiceEvent.CLOSED, item.notification));
    }

    private checkNotificationPosition(notification: INotification): void {
        while (this.hasNotificationWithSamePosition(notification)) notification.setY(notification.getY() + NotificationService.GAP);
    }

    private hasNotificationWithSamePosition(itemNotification: INotification): boolean {
        let y = itemNotification.getY();

        let result = false;
        this._notifications.forEach((content, config) => {
            let notification = content.notification;
            if (notification !== itemNotification && y === notification.getY()) result = true;
        });
        return result;
    }

    // --------------------------------------------------------------------------
    //
    // 	Help Methods
    //
    // --------------------------------------------------------------------------

    public open(config: NotificationConfig): INotificationContent {
        // if(isNaN(config.defaultWidth))
        // 	config.defaultWidth = 400;

        config.isModal = false;
        return this.openNotification(this.defaultNotification, config);
    }

    public errorTranslate(translationId: string, translation?: any): void {
        this.error(this.language.translate(translationId, translation));
    }
    public error(error: Error | ApiError | string): void {
        if (!error) return;

        let config = new NotificationConfig();
        config.closeDuration = NotificationService.DEFAULT_ERROR_DURATION;
        config.iconId = NotificationService.DEFAULT_ERROR_ICON_ID;
        if (typeof error === 'string') {
            config.data = error;
        } else if (error instanceof Error || error instanceof ApiError) {
            config.data = (error as any).message;
        }
        this.open(config);
    }

    public infoTranslate(
        translationId: string,
        translation?: any,
        picture?: string,
        closeDuration?: number,
        removeAfterClose?: boolean,
        iconId?: string
    ): void {
        this.info(this.language.translate(translationId, translation), picture, closeDuration, removeAfterClose, iconId);
    }
    public info(text: string, picture?: string, closeDuration: number = NaN, removeAfterClose?: boolean, iconId?: string): void {
        if (!text) {
            return;
        }

        let config = new NotificationConfig();
        config.data = text;
        config.iconId = iconId || NotificationService.DEFAULT_INFO_ICON_ID;
        config.closeDuration = !isNaN(closeDuration) ? closeDuration : NotificationService.DEFAULT_INFO_DURATION;
        config.isRemoveAfterClose = removeAfterClose;

        if (picture) {
            config.picture = picture;
        }

        this.open(config);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get events(): Observable<ObservableData<NotificationServiceEvent, NotificationConfig | INotification>> {
        return this.observer.asObservable();
    }

    public get notifications(): Map<NotificationConfig, INotificationContent> {
        return this._notifications;
    }

    public get configs(): Array<NotificationConfig> {
        return this._configs;
    }
}

export enum NotificationServiceEvent {
    OPENED = 'OPENED',
    CLOSED = 'CLOSED',
    ADDED = 'ADDED',
    REMOVED = 'REMOVED'
}
