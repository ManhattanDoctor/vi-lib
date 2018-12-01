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
var MomentDateAdaptivePipe = (function () {
    function MomentDateAdaptivePipe() {
    }
    MomentDateAdaptivePipe_1 = MomentDateAdaptivePipe;
    MomentDateAdaptivePipe.prototype.transform = function (value) {
        if (!value)
            return '---';
        var item = null;
        if (value instanceof Date)
            item = moment(value);
        else
            item = value;
        var now = moment();
        var duration = moment.duration(now.diff(item));
        var format = null;
        if (Math.abs(duration.asYears()) >= 1)
            format = MomentDateAdaptivePipe_1.YEAR_FORMAT;
        else if (Math.abs(duration.asMonths()) >= 1)
            format = MomentDateAdaptivePipe_1.MONTH_FORMAT;
        else if (Math.abs(duration.asDays()) >= 1)
            format = MomentDateAdaptivePipe_1.DAY_FORMAT;
        else
            format = MomentDateAdaptivePipe_1.HOUR_FORMAT;
        return item.format(format);
    };
    var MomentDateAdaptivePipe_1;
    MomentDateAdaptivePipe.HOUR_FORMAT = 'HH:ss';
    MomentDateAdaptivePipe.DAY_FORMAT = 'DD MMM HH:ss';
    MomentDateAdaptivePipe.MONTH_FORMAT = 'DD MMM HH:ss';
    MomentDateAdaptivePipe.YEAR_FORMAT = 'LLL';
    MomentDateAdaptivePipe = MomentDateAdaptivePipe_1 = __decorate([
        Pipe({
            name: 'formatMomentAdaptiveDate'
        }),
        __metadata("design:paramtypes", [])
    ], MomentDateAdaptivePipe);
    return MomentDateAdaptivePipe;
}());
export { MomentDateAdaptivePipe };
//# sourceMappingURL=../../../src/common/pipe/MomentDateAdaptivePipe.js.map