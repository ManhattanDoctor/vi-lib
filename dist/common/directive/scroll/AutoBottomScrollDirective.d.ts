import { EventEmitter } from '@angular/core';
import { InfiniteScrollDirective } from './InfiniteScrollDirective';
export declare class AutoBottomScrollDirective extends InfiniteScrollDirective {
    triggerChanged: EventEmitter<void>;
    private _trigger;
    private triggerTimer;
    private triggerDelta;
    private isScrollLocked;
    private lastScrollHeight;
    private isNeedScroll;
    private isNeedRemainScroll;
    protected initialize(): void;
    protected checkTrigger: () => void;
    protected scrollRemain(): void;
    scrollBottom(): void;
    protected scrollChangedHandler(): void;
    destroy(): void;
    trigger: number;
}
