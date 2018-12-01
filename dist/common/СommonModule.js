var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AssetBackgroundDirective } from './asset/directive/AssetBackgroundDirective';
import { AssetBackgroundPipe } from './asset/pipe/AssetBackgroundPipe';
import { AssetIconPipe } from './asset/pipe/AssetIconPipe';
import { AssetImagePipe } from './asset/pipe/AssetImagePipe';
import { InfiniteScrollDirective } from './directive/scroll/InfiniteScrollDirective';
import { ScrollDirective } from './directive/scroll/ScrollDirective';
import { FinancePipe } from './pipe/FinancePipe';
import { MomentDateAdaptivePipe } from './pipe/MomentDateAdaptivePipe';
import { MomentDatePipe } from './pipe/MomentDatePipe';
import { MomentTimePipe } from './pipe/MomentTimePipe';
import { NgModelErrorPipe } from './pipe/NgModelErrorPipe';
import { SanitizePipe } from './pipe/SanitizePipe';
import { LoadingService } from './service/LoadingService';
import { NativeWindowService } from './service/NativeWindowService';
import { MaxValidator } from './validator/MaxValidator';
import { MinValidator } from './validator/MinValidator';
var VichatterSDKModule = (function () {
    function VichatterSDKModule() {
    }
    VichatterSDKModule = __decorate([
        NgModule({
            imports: [],
            declarations: [
                AssetIconPipe,
                AssetImagePipe,
                AssetBackgroundPipe,
                AssetBackgroundDirective,
                FinancePipe,
                SanitizePipe,
                NgModelErrorPipe,
                MinValidator,
                MaxValidator,
                MomentTimePipe,
                MomentDatePipe,
                MomentDateAdaptivePipe,
                ScrollDirective,
                InfiniteScrollDirective
            ],
            providers: [NativeWindowService, LoadingService],
            exports: [
                AssetIconPipe,
                AssetImagePipe,
                AssetBackgroundPipe,
                AssetBackgroundDirective,
                FinancePipe,
                SanitizePipe,
                NgModelErrorPipe,
                MinValidator,
                MaxValidator,
                MomentTimePipe,
                MomentDatePipe,
                MomentDateAdaptivePipe,
                ScrollDirective,
                InfiniteScrollDirective
            ]
        })
    ], VichatterSDKModule);
    return VichatterSDKModule;
}());
export { VichatterSDKModule };
//# sourceMappingURL=../../src/common/СommonModule.js.map