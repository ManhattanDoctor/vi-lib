var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DatePipe } from '@angular/common';
import { DestroyableContainer } from '../container/DestroyableContainer';
import { LoadableEvent } from '../lib/Loadable';
import { FinancePipe } from '../pipe/FinancePipe';
import { MomentDateAdaptivePipe } from '../pipe/MomentDateAdaptivePipe';
import { MomentDatePipe } from '../pipe/MomentDatePipe';
import { MomentTimePipe } from '../pipe/MomentTimePipe';
import { SanitizePipe } from '../pipe/SanitizePipe';
var PipeBaseService = (function (_super) {
    __extends(PipeBaseService, _super);
    function PipeBaseService(language, sanitizer) {
        var _this = _super.call(this) || this;
        _this.language = language;
        _this.sanitizer = sanitizer;
        if (_this.language.isLoaded)
            _this.commitLanguageProperties();
        _this.addSubscription(_this.language.events.subscribe(function (data) {
            if (data.type == LoadableEvent.COMPLETE)
                _this.commitLanguageProperties();
        }));
        return _this;
    }
    PipeBaseService.prototype.commitLanguageProperties = function () {
        var locale = this.language.locale ? this.language.language.locale : 'en';
        this._locale = locale == 'en' ? 'en-US' : locale;
        if (PipeBaseService.DATE)
            PipeBaseService.DATE = new DatePipe(this.locale);
    };
    Object.defineProperty(PipeBaseService.prototype, "date", {
        get: function () {
            if (!PipeBaseService.DATE)
                PipeBaseService.DATE = new DatePipe(this.locale);
            return PipeBaseService.DATE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "finance", {
        get: function () {
            if (!PipeBaseService.FINANCE)
                PipeBaseService.FINANCE = new FinancePipe();
            return PipeBaseService.FINANCE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "momentDate", {
        get: function () {
            if (!PipeBaseService.MOMENT_DATE)
                PipeBaseService.MOMENT_DATE = new MomentDatePipe();
            return PipeBaseService.MOMENT_DATE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "momentDateAdaptive", {
        get: function () {
            if (!PipeBaseService.MOMENT_ADAPTIVE_DATE)
                PipeBaseService.MOMENT_ADAPTIVE_DATE = new MomentDateAdaptivePipe();
            return PipeBaseService.MOMENT_ADAPTIVE_DATE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "momentTime", {
        get: function () {
            if (!PipeBaseService.MOMENT_TIME)
                PipeBaseService.MOMENT_TIME = new MomentTimePipe();
            return PipeBaseService.MOMENT_TIME;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "sanitize", {
        get: function () {
            if (!PipeBaseService.SANITIZE)
                PipeBaseService.SANITIZE = new SanitizePipe(this.sanitizer);
            return PipeBaseService.SANITIZE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PipeBaseService.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        enumerable: true,
        configurable: true
    });
    return PipeBaseService;
}(DestroyableContainer));
export { PipeBaseService };
//# sourceMappingURL=../../../src/common/service/PipeBaseService.js.map