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
import { DateUtil } from '../util/DateUtil';
var MomentTimePipe = (function () {
    function MomentTimePipe() {
    }
    MomentTimePipe.prototype.transform = function (time, isDigital) {
        return isDigital ? this.transformDigitalTime(time) : this.transformTime(time);
    };
    MomentTimePipe.prototype.transformTime = function (time) {
        var value = moment();
        value.add(time, 'milliseconds');
        return value.fromNow();
    };
    MomentTimePipe.prototype.transformDigitalTime = function (time) {
        var seconds = time / DateUtil.MILISECONDS_SECOND;
        return numeral(seconds).format('00:00:00');
    };
    MomentTimePipe = __decorate([
        Pipe({
            name: 'formatMomentTime'
        }),
        __metadata("design:paramtypes", [])
    ], MomentTimePipe);
    return MomentTimePipe;
}());
export { MomentTimePipe };
//# sourceMappingURL=../../../src/common/pipe/MomentTimePipe.js.map