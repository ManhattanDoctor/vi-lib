import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private _counter: number = 0;
    private _isLoading: boolean = false;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {}

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public start(): void {
        this.counter++;
    }

    public finish(): void {
        this.counter--;
    }

    //--------------------------------------------------------------------------
    //
    //	Private Properties
    //
    //--------------------------------------------------------------------------

    private get counter(): number {
        return this._counter;
    }

    private set counter(value: number) {
        if (value == this._counter) return;

        this._counter = value;
        this._isLoading = this._counter != 0;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get isLoading(): boolean {
        return this._isLoading;
    }
}
