import { EventEmitter } from '@angular/core';
import { ScrollDirective } from './ScrollDirective';
export declare class InfiniteScrollDirective extends ScrollDirective {
    top: EventEmitter<number>;
    bottom: EventEmitter<number>;
    elementHeight: number;
    protected scrollChangedHandler(): void;
    protected readonly clientHeight: number;
    protected readonly scrollHeight: number;
}
