import { OnDestroy } from '@angular/core';
import { DestroyableContainer } from '../container/DestroyableContainer';

export class DestroyableComponent extends DestroyableContainer implements OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Interface Methods
    //
    //--------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this.destroy();
    }

    public destroy(): void {
        super.destroy();
    }
}
