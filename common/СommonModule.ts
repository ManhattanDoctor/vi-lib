import { NgModule } from '@angular/core';
import { TruncatePipe } from '@vi-lib/common/pipe/TruncatePipe';
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
import { LoginResolver } from './resolver/LoginResolver';
import { LoadingService } from './service/LoadingService';
import { NativeWindowService } from './service/NativeWindowService';
import { MaxValidator } from './validator/MaxValidator';
import { MinValidator } from './validator/MinValidator';

@NgModule({
    imports: [],
    declarations: [
        AssetIconPipe,
        AssetImagePipe,
        AssetBackgroundPipe,
        AssetBackgroundDirective,

        FinancePipe,
        SanitizePipe,
        TruncatePipe,
        NgModelErrorPipe,

        MinValidator,
        MaxValidator,

        MomentTimePipe,
        MomentDatePipe,
        MomentDateAdaptivePipe,

        ScrollDirective,
        InfiniteScrollDirective
    ],
    providers: [NativeWindowService, LoadingService, LoginResolver],
    exports: [
        AssetIconPipe,
        AssetImagePipe,
        AssetBackgroundPipe,
        AssetBackgroundDirective,

        FinancePipe,
        SanitizePipe,
        TruncatePipe,
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
export class ViCommonModule {}
