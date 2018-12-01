var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { Assets } from '../Assets';
var AssetBackgroundPipe = (function () {
    function AssetBackgroundPipe() {
    }
    AssetBackgroundPipe.prototype.transform = function (name, extension) {
        if (extension === void 0) { extension = 'png'; }
        return Assets.getBackground(name, extension);
    };
    AssetBackgroundPipe = __decorate([
        Pipe({
            name: 'assetBackground'
        })
    ], AssetBackgroundPipe);
    return AssetBackgroundPipe;
}());
export { AssetBackgroundPipe };
//# sourceMappingURL=../../../../src/common/asset/pipe/AssetBackgroundPipe.js.map