import { OverlayRef } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog';
import { INotification } from './INotification';
import { INotificationContent } from './INotificationContent';
import { NotificationConfig } from './NotificationConfig';

export class NotificationFactory<U extends INotification> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private classType) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public create(reference: MatDialogRef<INotificationContent>, config?: NotificationConfig, overlay?: OverlayRef): U {
        return new this.classType(reference, config, overlay);
    }
}
