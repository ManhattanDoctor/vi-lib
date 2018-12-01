var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var FinancePipe = (function () {
    function FinancePipe() {
    }
    FinancePipe.prototype.transform = function (value, format, isNeedPlus) {
        if (isNeedPlus === void 0) { isNeedPlus = false; }
        if (isNaN(value))
            return '---';
        if (!format)
            format = '0,0';
        if (isNeedPlus)
            format = '+' + format;
        return this.format(value, format);
    };
    FinancePipe.prototype.format = function (value, format) {
        try {
            return numeral(value).format(format);
        }
        catch (error) {
            return value.toString();
        }
    };
    FinancePipe = __decorate([
        Pipe({
            name: 'viFinance'
        })
    ], FinancePipe);
    return FinancePipe;
}());
export { FinancePipe };
//# sourceMappingURL=../../../src/common/pipe/FinancePipe.js.map