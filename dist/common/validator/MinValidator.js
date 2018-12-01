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
var MinValidator = (function () {
    function MinValidator(min) {
        this._validator = Validators.min(min);
    }
    MinValidator_1 = MinValidator;
    MinValidator.prototype.validate = function (control) {
        return this._validator(control);
    };
    var MinValidator_1;
    MinValidator = MinValidator_1 = __decorate([
        Directive({
            selector: '[min][ngControl],[min][ngFormControl],[min][ngModel]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MinValidator_1, multi: true }]
        }),
        __param(0, Attribute('min')),
        __metadata("design:paramtypes", [Number])
    ], MinValidator);
    return MinValidator;
}());
export { MinValidator };
//# sourceMappingURL=../../../src/common/validator/MinValidator.js.map