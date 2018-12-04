import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { ThemeAssetBackgroundDirective } from './directive/ThemeAssetBackgroundDirective';
import { ThemeAssetDirective } from './directive/ThemeAssetDirective';
import { ThemeImageDirective } from './directive/ThemeImageDirective';
import { ThemeToggleDirective } from './directive/ThemeToggleDirective';
import { ThemeService } from './service/ThemeService';

@NgModule({
    imports: [CookieModule.forRoot()],
    providers: [ThemeService],
    declarations: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective],
    exports: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective]
})
export class ThemeModule {}
