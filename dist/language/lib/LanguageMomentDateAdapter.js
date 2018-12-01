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
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { LoadableEvent } from '../../common/lib/Loadable';
var LanguageMomentDateAdapter = (function (_super) {
    __extends(LanguageMomentDateAdapter, _super);
    function LanguageMomentDateAdapter(language) {
        var _this = _super.call(this, language.locale) || this;
        language.events.subscribe(function (data) {
            if (data.type == LoadableEvent.COMPLETE)
                _this.setLocale(language.locale);
        });
        return _this;
    }
    return LanguageMomentDateAdapter;
}(MomentDateAdapter));
export { LanguageMomentDateAdapter };
//# sourceMappingURL=../../../src/language/lib/LanguageMomentDateAdapter.js.map