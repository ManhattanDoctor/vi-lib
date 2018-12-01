import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DragableWindow } from '../../../window/lib/window/DragableWindow';
import { CloseWindowElementComponent } from './element/close-window-element.component';
import { MinimizeWindowElementComponent } from './element/minimize-window-element.component';
import { ResizeWindowElementComponent } from './element/resize-window-element.component';
export declare class DefaultWindow extends DragableWindow {
    protected closeWindow: ComponentRef<CloseWindowElementComponent>;
    protected resizedWindow: ComponentRef<ResizeWindowElementComponent>;
    protected minimizeWindow: ComponentRef<MinimizeWindowElementComponent>;
    protected setProperties(): void;
    protected commitIsBlinkProperties(): void;
    protected commitIsShakingProperties(): void;
    protected commitIsMinimizedProperties(): void;
    protected isNeedClickStopPropagation(event: MouseEvent): boolean;
    protected readonly resolver: ComponentFactoryResolver;
    destroy(): void;
}
