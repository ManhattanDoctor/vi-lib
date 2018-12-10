import { Injectable } from '@angular/core';
import { Loadable, LoadableStatus } from '@vi-lib/common/lib/Loadable';
import { ObservableData } from '@vi-lib/common/observer/ObservableData';

@Injectable()
export class LoadingService extends Loadable<LoadingServiceEvent, number> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _counter: number = 0;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public start(): void {
        this.counter++;
    }

    public finish(): void {
        this.counter--;
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    // --------------------------------------------------------------------------

    private get counter(): number {
        return this._counter;
    }

    private set counter(value: number) {
        if (value === this._counter) {
            return;
        }

        this._counter = value;
        this.observer.next(new ObservableData(LoadingServiceEvent.COUNTER_CHANGED, value));
        this.setStatus(value === 0 ? LoadableStatus.LOADING : LoadableStatus.LOADED);
    }
}

export enum LoadingServiceEvent {
    COUNTER_CHANGED = 'COUNTER_CHANGED'
}
