import { OverlayRef } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material';
import { INotification } from './INotification';
import { INotificationContent } from './INotificationContent';
import { NotificationConfig } from './NotificationConfig';
export declare class NotificationFactory<U extends INotification> {
    private classType;
    constructor(classType: any);
    create(reference: MatDialogRef<INotificationContent>, config?: NotificationConfig, overlay?: OverlayRef): U;
}
