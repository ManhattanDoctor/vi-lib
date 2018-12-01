var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NG_VALIDATORS, Validators } from '@angular/forms';
import { Attribute, Directive } from '@angular/core';
var MaxValidator = (function () {
    function MaxValidator(max) {
        this._validator = Validators.max(max);
        console.log(max);
    }
    MaxValidator_1 = MaxValidator;
    MaxValidator.prototype.validate = function (control) {
        return this._validator(control);
    };
    var MaxValidator_1;
    MaxValidator = MaxValidator_1 = __decorate([
        Directive({
            selector: '[max][ngControl],[max][ngFormControl],[max][ngModel]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MaxValidator_1, multi: true }]
        }),
        __param(0, Attribute('max')),
        __metadata("design:paramtypes", [Number])
    ], MaxValidator);
    return MaxValidator;
}());
export { MaxValidator };
//# sourceMappingURL=../../../src/common/validator/MaxValidator.js.map