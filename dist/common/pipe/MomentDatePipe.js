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
import * as moment from 'moment';
import { StringUtil } from '../util/StringUtil';
var MomentDatePipe = (function () {
    function MomentDatePipe() {
    }
    MomentDatePipe_1 = MomentDatePipe;
    MomentDatePipe.prototype.transform = function (value, format) {
        if (!value)
            return null;
        var item = null;
        if (value instanceof Date)
            item = moment(value);
        else
            item = value;
        return item.format(format || MomentDatePipe_1.DEFAULT_FORMAT);
    };
    MomentDatePipe.prototype.fromNow = function (value, format, isNeedCapitalize) {
        if (format === void 0) { format = 'LLL'; }
        if (isNeedCapitalize === void 0) { isNeedCapitalize = true; }
        if (!value)
            return null;
        var item = null;
        if (value instanceof Date)
            item = moment(value);
        else
            item = value;
        var date = item.fromNow();
        if (format)
            date += ' (' + item.format(format) + ')';
        return isNeedCapitalize ? StringUtil.capitalizeFirstLetter(date) : date;
    };
    var MomentDatePipe_1;
    MomentDatePipe.DEFAULT_FORMAT = 'LLL';
    MomentDatePipe = MomentDatePipe_1 = __decorate([
        Pipe({
            name: 'formatMomentDate'
        }),
        __metadata("design:paramtypes", [])
    ], MomentDatePipe);
    return MomentDatePipe;
}());
export { MomentDatePipe };
//# sourceMappingURL=../../../src/common/pipe/MomentDatePipe.js.map