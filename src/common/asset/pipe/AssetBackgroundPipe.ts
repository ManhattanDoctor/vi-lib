import { Pipe, PipeTransform } from '@angular/core';
import { Assets } from '../Assets';

@Pipe({
    name: 'assetBackground'
})
export class AssetBackgroundPipe implements PipeTransform {
    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public transform(name: string, extension: string = 'png'): string {
        return Assets.getBackground(name, extension);
    }
}
