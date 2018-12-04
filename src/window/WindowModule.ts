import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { WindowDragAreaDirective } from './directive/WindowDragAreaDirective';
import { WindowService } from './service/WindowService';

@NgModule({
    imports: [MatDialogModule],
    declarations: [WindowDragAreaDirective],
    providers: [WindowService],
    exports: [MatDialogModule, WindowDragAreaDirective]
})
export class WindowModule {}
