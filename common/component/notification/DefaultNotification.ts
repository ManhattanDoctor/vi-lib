import { ComponentFactoryResolver } from '@angular/core';
import { Notification } from '../../../notification/lib/Notification';
import { APPLICATION_INJECTOR } from '../../ApplicationInjector';

export class DefaultNotification extends Notification {
    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected setProperties(): void {
        super.setProperties();
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get resolver(): ComponentFactoryResolver {
        return APPLICATION_INJECTOR().get(ComponentFactoryResolver);
    }
}
