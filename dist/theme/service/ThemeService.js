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
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { MapCollection } from '../../common/map/MapCollection';
import { ArrayUtil } from '../../common/util/ArrayUtil';
import { ViewUtil } from '../../common/util/ViewUtil';
import { Theme } from '../lib/Theme';
var ThemeService = (function () {
    function ThemeService(cookies) {
        this.cookies = cookies;
        this.observer = new Subject();
        this._themes = new MapCollection();
    }
    ThemeService.prototype.initialize = function (themes, defaultTheme) {
        this.themes.clear();
        if (!ArrayUtil.isEmpty(themes)) {
            for (var _i = 0, themes_1 = themes; _i < themes_1.length; _i++) {
                var item = themes_1[_i];
                var theme = new Theme();
                theme.update(item);
                this.themes.add(theme);
            }
        }
        var name = defaultTheme;
        if (this.themes.has(name))
            this.theme = this.themes.get(name);
        else if (this.themes.length > 0)
            this.theme = this.themes.collection[0];
    };
    ThemeService.prototype.getStyle = function (name) {
        return this.theme ? this.theme.getStyle(name) : null;
    };
    Object.defineProperty(ThemeService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThemeService.prototype, "themes", {
        get: function () {
            return this._themes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThemeService.prototype, "theme", {
        get: function () {
            return this._theme;
        },
        set: function (value) {
            if (value == this._theme)
                return;
            if (this._theme && document)
                ViewUtil.removeClass(document.body, this._theme.styleName);
            this._theme = value;
            this.observer.next(ThemeServiceEvent.CHANGED);
            if (this._theme) {
                this.cookies.put('theme', this._theme.name);
                if (document)
                    ViewUtil.addClass(document.body, this._theme.styleName);
            }
            else {
                this.cookies.remove('theme');
            }
        },
        enumerable: true,
        configurable: true
    });
    ThemeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService])
    ], ThemeService);
    return ThemeService;
}());
export { ThemeService };
export var ThemeServiceEvent;
(function (ThemeServiceEvent) {
    ThemeServiceEvent["CHANGED"] = "changed";
})(ThemeServiceEvent || (ThemeServiceEvent = {}));
//# sourceMappingURL=../../../src/theme/service/ThemeService.js.map