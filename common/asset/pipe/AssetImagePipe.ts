import { Pipe, PipeTransform } from '@angular/core';
import { Assets } from '../Assets';

@Pipe({
    name: 'assetImage'
})
export class AssetImagePipe implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(name: string, extension: string = 'png'): string {
        return Assets.getImage(name, extension);
    }
}
