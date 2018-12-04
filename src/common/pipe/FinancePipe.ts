import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'viFinance'
})
export class FinancePipe implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(value: number, format?: string, isNeedPlus: boolean = false): string {
        if (isNaN(value)) return '---';

        if (!format) format = '0,0';

        if (isNeedPlus) format = '+' + format;

        return this.format(value, format);
    }

    public format(value: number, format: string): string {
        try {
            return numeral(value).format(format);
        } catch (error) {
            return value.toString();
        }
    }
}

declare let numeral: any;
