import { Observable } from 'rxjs';
import { INotificationContent } from './INotificationContent';
import { NotificationConfig } from './NotificationConfig';
export declare abstract class INotification {
    static EVENT_OPENED: string;
    static EVENT_CLOSED: string;
    static EVENT_REMOVED: string;
    static EVENT_CONTENT_READY: string;
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
    readonly events: Observable<string>;
    readonly container: HTMLElement;
    readonly config: NotificationConfig;
    readonly content: INotificationContent;
}
