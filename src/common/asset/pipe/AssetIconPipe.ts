import { Pipe, PipeTransform } from '@angular/core';
import { Assets } from '../Assets';

@Pipe({
    name: 'assetIcon'
})
export class AssetIconPipe implements PipeTransform {
    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public transform(name: string, extension: string = 'png'): string {
        return Assets.getIcon(name, extension);
    }
}
