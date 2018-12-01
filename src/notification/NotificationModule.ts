import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { NotificationService } from './service/NotificationService';

@NgModule({
    imports: [MatDialogModule],
    providers: [NotificationService],
    exports: [MatDialogModule]
})
export class NotificationModule {}
