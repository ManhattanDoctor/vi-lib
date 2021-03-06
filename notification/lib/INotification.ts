import { Observable } from 'rxjs';
import { INotificationContent } from './INotificationContent';
import { NotificationConfig } from './NotificationConfig';

export abstract class INotification {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    public static EVENT_OPENED = 'EVENT_OPENED';
    public static EVENT_CLOSED = 'EVENT_CLOSED';
    public static EVENT_REMOVED = 'EVENT_REMOVED';

    public static EVENT_CONTENT_READY = 'EVENT_CONTENT_READY';

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    abstract getX(): number;
    abstract getY(): number;
    abstract setX(value: number): void;
    abstract setY(value: number): void;
    abstract move(x: number, y: number): void;

    abstract getWidth(): number;
    abstract getHeight(): number;
    abstract setWidth(value: number): void;
    abstract setHeight(value: number): void;
    abstract setSize(width: number, height: number): void;

    abstract close(): void;
    abstract remove(): void;
    abstract destroy(): void;

    abstract emit(event: string): void;

    // --------------------------------------------------------------------------
    //
    // 	Interface Methods
    //
    // --------------------------------------------------------------------------

    readonly events: Observable<string>;
    readonly container: HTMLElement;

    readonly config: NotificationConfig;
    readonly content: INotificationContent;
}
