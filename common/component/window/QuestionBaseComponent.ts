import { OnInit, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LanguageService } from '../../../language/service/LanguageService';
import { IWindowContent } from '../../../window/lib/IWindowContent';
import { IQuestion, QuestionMode } from '../../IQuestion';

export class QuestionBaseComponent extends IWindowContent implements IQuestion, OnInit {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public text: string;
    public notText: string;
    public yesText: string;
    public closeText: string;
    public checkText: string;

    protected observer: Subject<string>;

    protected _mode: QuestionMode = 'question';
    protected _isChecked: boolean = false;

    protected _closePromise: Promise<void>;
    protected closePromiseResolve: (...args) => any;

    protected _yesNotPromise: Promise<void>;
    protected yesNotPromiseReject: (...args) => any;
    protected yesNotPromiseResolve: (...args) => any;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(container: ViewContainerRef, protected language: LanguageService) {
        super(container);

        this.observer = new Subject();
   
        this._yesNotPromise = new Promise<void>((resolve, reject) => {
            this.yesNotPromiseReject = reject;
            this.yesNotPromiseResolve = resolve;
        });

        this._closePromise = new Promise<void>(resolve => {
            this.closePromiseResolve = resolve;
        });
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected commitModeProperties(): void {}

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public closeClickHandler(): void {
        this.closePromiseResolve();
        this.emit(IQuestion.EVENT_CLOSE);
        this.close();
    }

    public yesClickHandler(): void {
        this.yesNotPromiseResolve();
        this.emit(IQuestion.EVENT_YES);
        this.close();
    }

    public notClickHandler(): void {
        this.yesNotPromiseReject();
        this.emit(IQuestion.EVENT_NOT);
        this.close();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngOnInit(): void {
        if (this.mode === 'question') {
            if (!this.yesText) {
                this.yesTextId = this.defaultYesId;
            }
            if (!this.notText) {
                this.notTextId = this.defaultNoId;
            }
        } else if (this.mode === 'info') {
            if (!this.closeText) {
                this.closeTextId = this.defaultCloseId;
            }
        }
    }

    public destroy(): void {
        super.destroy();
        this.observer = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Interface Properties
    //
    // --------------------------------------------------------------------------

    public get events(): Observable<string> {
        return this.observer.asObservable();
    }

    public get yesNotPromise(): Promise<void> {
        return this._yesNotPromise;
    }

    public get closePromise(): Promise<void> {
        return this._closePromise;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get defaultYesId(): string {
        return 'general.yes';
    }

    protected get defaultNoId(): string {
        return 'general.no';
    }

    protected get defaultCloseId(): string {
        return 'general.close';
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get isChecked(): boolean {
        return this._isChecked;
    }
    public set isChecked(value: boolean) {
        if (value === this._isChecked) {
            return;
        }
        this._isChecked = value;
        this.emit(value ? IQuestion.EVENT_CHECK : IQuestion.EVENT_UNCHECK);
    }

    public get mode(): QuestionMode {
        return this._mode;
    }
    public set mode(value: QuestionMode) {
        if (value === this._mode) return;

        this._mode = value;
        this.commitModeProperties();
    }

    public set closeTextId(value: string) {
        if (value) {
            this.closeText = this.language.translate(value);
        }
    }

    public set yesTextId(value: string) {
        if (value) {
            this.yesText = this.language.translate(value);
        }
    }

    public set notTextId(value: string) {
        if (value) {
            this.notText = this.language.translate(value);
        }
    }

    public set checkTextId(value: string) {
        if (value) {
            this.checkText = this.language.translate(value);
        }
    }
}
