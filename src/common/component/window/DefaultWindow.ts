import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DragableWindow } from '../../../window/lib/window/DragableWindow';
import { APPLICATION_INJECTOR } from '../../ApplicationInjector';
import { ViewUtil } from '../../util/ViewUtil';
import { CloseWindowElementComponent } from './element/close-window-element.component';
import { MinimizeWindowElementComponent } from './element/minimize-window-element.component';
import { ResizeWindowElementComponent } from './element/resize-window-element.component';

export class DefaultWindow extends DragableWindow {
    //--------------------------------------------------------------------------
    //
    //  Properties Methods
    //
    //--------------------------------------------------------------------------

    protected closeWindow: ComponentRef<CloseWindowElementComponent>;
    protected resizedWindow: ComponentRef<ResizeWindowElementComponent>;
    protected minimizeWindow: ComponentRef<MinimizeWindowElementComponent>;

    //--------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    //--------------------------------------------------------------------------

    protected setProperties(): void {
        super.setProperties();

        if (!this.config.disableClose && !this.closeWindow) {
            let factory = this.resolver.resolveComponentFactory(CloseWindowElementComponent);
            this.closeWindow = this.content.container.createComponent(factory);
            this.closeWindow.instance.window = this;
        }

        if (this.config.isResizeable && !this.resizedWindow) {
            let factory = this.resolver.resolveComponentFactory(ResizeWindowElementComponent);
            this.resizedWindow = this.content.container.createComponent(factory);
        }

        if (this.config.isMinimizable && !this.minimizeWindow) {
            let factory = this.resolver.resolveComponentFactory(MinimizeWindowElementComponent);
            this.minimizeWindow = this.content.container.createComponent(factory);
            this.minimizeWindow.instance.window = this;
        }
    }

    protected commitIsBlinkProperties(): void {
        ViewUtil.toggleClass(this.container, 'blink', this.isBlink);
    }

    protected commitIsShakingProperties(): void {
        ViewUtil.toggleClass(this.container, 'shake-constant', this.isShaking);
        ViewUtil.toggleClass(this.container, 'shake-horizontal', this.isShaking);
    }

    protected commitIsMinimizedProperties(): void {
        ViewUtil.toggleClass(this.container, 'minimized', this.isMinimized);
        ViewUtil.toggleClass(this.content.element, 'minimized', this.isMinimized);
        ViewUtil.toggleClass(this.content.element.nativeElement.parentElement, 'minimized', this.isMinimized);
    }

    protected isNeedClickStopPropagation(event: MouseEvent): boolean {
        if (!super.isNeedClickStopPropagation(event)) return false;

        if (this.closeWindow && this.closeWindow.location.nativeElement == event.target) return false;

        return true;
    }

    //--------------------------------------------------------------------------
    //
    //  Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get resolver(): ComponentFactoryResolver {
        return APPLICATION_INJECTOR().get(ComponentFactoryResolver);
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();

        if (this.closeWindow) {
            this.closeWindow.destroy();
            this.closeWindow = null;
        }
        if (this.resizedWindow) {
            this.resizedWindow.destroy();
            this.resizedWindow = null;
        }
        if (this.minimizeWindow) {
            this.minimizeWindow.destroy();
            this.minimizeWindow = null;
        }
    }
}
