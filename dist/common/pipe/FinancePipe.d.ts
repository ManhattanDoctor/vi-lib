import { PipeTransform } from '@angular/core';
export declare class FinancePipe implements PipeTransform {
    transform(value: number, format?: string, isNeedPlus?: boolean): string;
    format(value: number, format: string): string;
}
