import { Observable } from 'rxjs';
export declare abstract class IQuestion {
    static EVENT_YES: string;
    static EVENT_NOT: string;
    static EVENT_CHECK: string;
    static EVENT_UNCHECK: string;
    mode: QuestionMode;
    isChecked: boolean;
    text: string;
    notTextId: string;
    yesTextId: string;
    checkTextId: string;
    close(): void;
    readonly events: Observable<string>;
    readonly yesNotPromise: Promise<void>;
}
export declare type QuestionMode = 'info' | 'question';
