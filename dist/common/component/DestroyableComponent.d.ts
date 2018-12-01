import { OnDestroy } from '@angular/core';
import { DestroyableContainer } from '../container/DestroyableContainer';
export declare class DestroyableComponent extends DestroyableContainer implements OnDestroy {
    ngOnDestroy(): void;
    destroy(): void;
}
