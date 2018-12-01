import { ComponentFactoryResolver } from '@angular/core';
import { Notification } from '../../../notification/lib/Notification';
export declare class DefaultNotification extends Notification {
    protected setProperties(): void;
    protected readonly resolver: ComponentFactoryResolver;
}
