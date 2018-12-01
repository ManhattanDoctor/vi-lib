var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { LanguageService } from '../../language/service/LanguageService';
var NgModelErrorPipe = (function () {
    function NgModelErrorPipe(language) {
        this.language = language;
    }
    NgModelErrorPipe.prototype.transform = function (value) {
        if (!value)
            return null;
        var keys = Object.keys(value);
        if (keys.length == 0)
            return null;
        var key = keys[0];
        return this.translateError(key, value[key]);
    };
    NgModelErrorPipe.prototype.translateError = function (key, value) {
        return this.language.translate('error.form.' + key, value);
    };
    NgModelErrorPipe = __decorate([
        Pipe({
            name: 'formatNgModelError'
        }),
        __metadata("design:paramtypes", [LanguageService])
    ], NgModelErrorPipe);
    return NgModelErrorPipe;
}());
export { NgModelErrorPipe };
//# sourceMappingURL=../../../src/common/pipe/NgModelErrorPipe.js.map