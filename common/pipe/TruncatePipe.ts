import { Pipe, PipeTransform } from '@angular/core';
import { StringUtil } from '../util/StringUtil';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(value: any, maxLength?: number): string {
        if (!value) {
            return '---';
        }
        return StringUtil.truncate(value.toString(), maxLength);
    }
}
