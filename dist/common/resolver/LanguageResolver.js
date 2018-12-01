var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LanguageService } from '../../language/service/LanguageService';
import { LoadableEvent } from '../lib/Loadable';
var LanguageResolver = (function () {
    function LanguageResolver(language) {
        this.language = language;
    }
    LanguageResolver.prototype.resolve = function () {
        var _this = this;
        if (this.language.language)
            return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var subscription = _this.language.events.subscribe(function (data) {
                if (data.type == LoadableEvent.COMPLETE)
                    resolve();
                else if (data.type == LoadableEvent.ERROR)
                    reject();
                else if (data.type == LoadableEvent.FINISHED)
                    subscription.unsubscribe();
            });
        });
    };
    LanguageResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LanguageService])
    ], LanguageResolver);
    return LanguageResolver;
}());
export { LanguageResolver };
//# sourceMappingURL=../../../src/common/resolver/LanguageResolver.js.map