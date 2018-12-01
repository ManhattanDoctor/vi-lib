import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../language/service/LanguageService';
import { DestroyableContainer } from '../container/DestroyableContainer';
import { FinancePipe } from '../pipe/FinancePipe';
import { MomentDateAdaptivePipe } from '../pipe/MomentDateAdaptivePipe';
import { MomentDatePipe } from '../pipe/MomentDatePipe';
import { MomentTimePipe } from '../pipe/MomentTimePipe';
import { SanitizePipe } from '../pipe/SanitizePipe';
export declare class PipeBaseService extends DestroyableContainer {
    language: LanguageService;
    sanitizer: DomSanitizer;
    private static DATE;
    private static FINANCE;
    private static SANITIZE;
    private static MOMENT_TIME;
    private static MOMENT_DATE;
    private static MOMENT_ADAPTIVE_DATE;
    private _locale;
    constructor(language: LanguageService, sanitizer: DomSanitizer);
    protected commitLanguageProperties(): void;
    readonly date: DatePipe;
    readonly finance: FinancePipe;
    readonly momentDate: MomentDatePipe;
    readonly momentDateAdaptive: MomentDateAdaptivePipe;
    readonly momentTime: MomentTimePipe;
    readonly sanitize: SanitizePipe;
    readonly locale: string;
}
