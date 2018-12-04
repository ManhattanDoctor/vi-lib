import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../language/service/LanguageService';
import { LoadableEvent } from '../lib/Loadable';

@Injectable()
export class LanguageResolver implements Resolve<void> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected language: LanguageService) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(): Promise<void> {
        if (this.language.language) return Promise.resolve();

        return new Promise<void>((resolve, reject) => {
            let subscription: Subscription = this.language.events.subscribe(data => {
                if (data.type === LoadableEvent.COMPLETE) resolve();
                else if (data.type === LoadableEvent.ERROR) reject();
                else if (data.type === LoadableEvent.FINISHED) subscription.unsubscribe();
            });
        });
    }
}
