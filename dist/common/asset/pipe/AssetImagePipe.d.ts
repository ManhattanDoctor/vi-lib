import { PipeTransform } from '@angular/core';
export declare class AssetImagePipe implements PipeTransform {
    transform(name: string, extension?: string): string;
}
