import { Observable } from 'rxjs';

export abstract class IQuestion {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    public static EVENT_YES: string = 'EVENT_YES';
    public static EVENT_NOT: string = 'EVENT_NOT';
    public static EVENT_CLOSE: string = 'EVENT_OK';

    public static EVENT_CHECK: string = 'EVENT_CHECK';
    public static EVENT_UNCHECK: string = 'EVENT_UNCHECK';

    public mode: QuestionMode;
    public isChecked: boolean = false;

    public text: string;
    public notTextId: string;
    public yesTextId: string;
    public closeTextId: string;
    public checkTextId: string;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public close(): void {}

    // --------------------------------------------------------------------------
    //
    // 	Interface Methods
    //
    // --------------------------------------------------------------------------

    readonly events: Observable<string>;
    readonly closePromise: Promise<void>;
    readonly yesNotPromise: Promise<void>;
}

export declare type QuestionMode = 'info' | 'question';
