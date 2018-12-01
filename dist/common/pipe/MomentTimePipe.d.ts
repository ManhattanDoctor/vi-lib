import { PipeTransform } from '@angular/core';
export declare class MomentTimePipe implements PipeTransform {
    transform(time: number, isDigital?: boolean): string;
    transformTime(time: number): string;
    transformDigitalTime(time: number): string;
    constructor();
}
