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
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { ObservableData } from '../../common/observer/ObservableData';
import { ArrayUtil } from '../../common/util/ArrayUtil';
import { ViewUtil } from '../../common/util/ViewUtil';
import { LanguageService } from '../../language/service/LanguageService';
import { IWindow } from '../lib/IWindow';
import { WindowConfig } from '../lib/WindowConfig';
var WindowService = (function () {
    function WindowService(dialog, language, cookies) {
        this.dialog = dialog;
        this.language = language;
        this.cookies = cookies;
        this.isNeedCheckWindowPositionAfterOpen = true;
        this._windows = new Map();
        this._windowsArray = [];
        this.observer = new Subject();
        this.properties = new PropertiesManager(cookies);
        var service = dialog;
        service.getOverlayStateModal = service._getOverlayState;
        service.getOverlayStateNonModal = function (config) {
            var state = this.getOverlayStateModal(config);
            state.hasBackdrop = false;
            return state;
        };
    }
    WindowService_1 = WindowService;
    WindowService.prototype.sortFunction = function (first, second) {
        var firstIndex = first.container ? parseInt(ViewUtil.getStyle(first.container.parentElement, 'zIndex'), 10) : -1;
        var secondIndex = second.container ? parseInt(ViewUtil.getStyle(second.container.parentElement, 'zIndex'), 10) : -1;
        return firstIndex > secondIndex ? -1 : 1;
    };
    WindowService.prototype.setWindowOnTop = function (topWindow) {
        var currentIndex = WindowService_1.TOP_Z_INDEX - 2;
        for (var _i = 0, _a = this._windowsArray; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            if (window_1.container) {
                window_1.isOnTop = window_1 === topWindow;
                var zIndex = window_1.isOnTop ? WindowService_1.TOP_Z_INDEX : currentIndex--;
                ViewUtil.setStyle(window_1.backdrop, 'zIndex', zIndex);
                ViewUtil.setStyle(window_1.wrapper, 'zIndex', zIndex);
            }
        }
        this._windowsArray.sort(this.sortFunction);
        this.observer.next(new ObservableData(WindowServiceEvent.SETTED_ON_TOP, topWindow));
    };
    WindowService.prototype.updateTopWindow = function () {
        var zIndex = 0;
        var topWindow = null;
        this._windowsArray.forEach(function (window) {
            if (window.container) {
                var wrapper = window.container.parentElement;
                var index = parseInt(ViewUtil.getStyle(wrapper, 'zIndex'), 10);
                if (zIndex < index) {
                    zIndex = index;
                    topWindow = window;
                }
            }
        });
        if (!topWindow || topWindow.isOnTop)
            return;
        topWindow.isOnTop = true;
        this.observer.next(new ObservableData(WindowServiceEvent.SETTED_ON_TOP, topWindow));
    };
    WindowService.prototype.checkWindowPosition = function (window) {
        while (this.hasWindowWithSamePosition(window)) {
            window.setX(window.getX() + WindowService_1.GAP_X);
            window.setY(window.getY() + WindowService_1.GAP_Y);
        }
    };
    WindowService.prototype.hasWindowWithSamePosition = function (itemWindow) {
        var x = itemWindow.getX();
        var y = itemWindow.getY();
        var result = false;
        this._windowsArray.forEach(function (window) {
            if (window !== itemWindow && x === window.getX() && y === window.getY())
                result = true;
        });
        return result;
    };
    WindowService.prototype.add = function (config, content) {
        this._windows.set(config, content);
        this._windowsArray.push(content.window);
        this.observer.next(new ObservableData(WindowServiceEvent.OPENED, content.window));
    };
    WindowService.prototype.remove = function (config, window) {
        this._windows.delete(config);
        ArrayUtil.remove(this._windowsArray, window);
        this.observer.next(new ObservableData(WindowServiceEvent.CLOSED, window));
    };
    WindowService.prototype.get = function (id) {
        var result = null;
        this._windowsArray.forEach(function (window) {
            if (window.config.id === id) {
                result = window;
                return true;
            }
        });
        return result;
    };
    WindowService.prototype.openWindow = function (component, config) {
        var _this = this;
        var window = null;
        if (config.id) {
            window = this.get(config.id);
            if (window)
                return window.content;
        }
        if (!config.defaultMinWidth)
            config.defaultMinWidth = WindowService_1.DEFAULT_MIN_WIDTH;
        if (!config.defaultMinHeight)
            config.defaultMinHeight = WindowService_1.DEFAULT_MIN_HEIGHT;
        if (!config.verticalAlign)
            config.verticalAlign = WindowService_1.DEFAULT_VERTICAL_ALIGN;
        if (!config.horizontalAlign)
            config.horizontalAlign = WindowService_1.DEFAULT_HORIZONTAL_ALIGN;
        if (isNaN(config.paddingTop))
            config.paddingTop = WindowService_1.DEFAULT_PADDING_TOP;
        if (isNaN(config.paddingLeft))
            config.paddingLeft = WindowService_1.DEFAULT_PADDING_LEFT;
        if (isNaN(config.paddingRight))
            config.paddingRight = WindowService_1.DEFAULT_PADDING_RIGHT;
        if (isNaN(config.paddingBottom))
            config.paddingBottom = WindowService_1.DEFAULT_PADDING_BOTTOM;
        if (config.propertiesId)
            this.properties.load(config.propertiesId, config);
        config.setDefaultProperties();
        var dialog = this.dialog;
        dialog._getOverlayState = config.isModal ? dialog.getOverlayStateModal : dialog.getOverlayStateNonModal;
        var reference = this.dialog.open(component, config);
        var properties = {};
        properties.config = config;
        properties.reference = reference;
        properties.overlay = reference._overlayRef;
        window = this.factory.create(properties);
        var subscription = window.events.subscribe(function (event) {
            if (event === IWindow.EVENT_OPENED) {
                _this.add(config, reference.componentInstance);
                _this.setWindowOnTop(window);
                if (_this.isNeedCheckWindowPositionAfterOpen)
                    _this.checkWindowPosition(window);
            }
            else if (event === IWindow.EVENT_CLOSED) {
                subscription.unsubscribe();
                _this.remove(config, window);
                if (window.isOnTop && _this.windows.size > 0)
                    _this.updateTopWindow();
            }
            else if (event === IWindow.EVENT_RESIZED) {
                if (config.propertiesId)
                    _this.properties.save(config.propertiesId, window);
            }
            else if (event === IWindow.EVENT_SET_ON_TOP) {
                _this.setWindowOnTop(window);
            }
        });
        return window.content;
    };
    WindowService.prototype.getWindow = function (value) {
        var id = value.toString();
        if (value instanceof WindowConfig)
            id = value.id;
        if (!id)
            return null;
        var window = this.get(id);
        return window ? window.content : null;
    };
    WindowService.prototype.hasWindow = function (value) {
        return this.getWindow(value) != null;
    };
    WindowService.prototype.removeAll = function () {
        this._windowsArray.forEach(function (window) { return window.close(); });
    };
    WindowService.prototype.setWindowOnTopIfExist = function (value) {
        var content = this.getWindow(value);
        if (!content)
            return false;
        content.window.setOnTop();
        return true;
    };
    WindowService.prototype.info = function (translationId, translation) {
        var config = this.factory.createConfig(true, false, 450);
        var content = this.openWindow(this.questionWindow, config);
        var question = content;
        question.text = this.language.translate(translationId, translation);
        question.mode = 'info';
        return question;
    };
    WindowService.prototype.question = function (translationId, translation) {
        var config = this.factory.createConfig(true, false, 450);
        var content = this.openWindow(this.questionWindow, config);
        config.disableClose = true;
        var question = content;
        question.text = this.language.translate(translationId, translation);
        question.mode = 'question';
        return question;
    };
    Object.defineProperty(WindowService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "windows", {
        get: function () {
            return this._windows;
        },
        enumerable: true,
        configurable: true
    });
    var WindowService_1;
    WindowService.GAP_X = 25;
    WindowService.GAP_Y = 25;
    WindowService.TOP_Z_INDEX = 999;
    WindowService.DEFAULT_MIN_WIDTH = 100;
    WindowService.DEFAULT_MIN_HEIGHT = 100;
    WindowService.DEFAULT_PADDING_TOP = 25;
    WindowService.DEFAULT_PADDING_LEFT = 25;
    WindowService.DEFAULT_PADDING_RIGHT = 25;
    WindowService.DEFAULT_PADDING_BOTTOM = 25;
    WindowService.DEFAULT_VERTICAL_ALIGN = 'center';
    WindowService.DEFAULT_HORIZONTAL_ALIGN = 'center';
    WindowService = WindowService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MatDialog, LanguageService, CookieService])
    ], WindowService);
    return WindowService;
}());
export { WindowService };
var PropertiesManager = (function () {
    function PropertiesManager(cookies) {
        this.cookies = cookies;
    }
    PropertiesManager.prototype.load = function (name, config) {
        var properties = this.cookies.getObject(name + 'Window');
        if (!properties)
            return;
        if (properties.hasOwnProperty('width'))
            config.defaultWidth = properties.width;
        if (properties.hasOwnProperty('height'))
            config.defaultHeight = properties.height;
    };
    PropertiesManager.prototype.save = function (name, window) {
        var properties = {};
        properties.width = window.getWidth();
        properties.height = window.getHeight();
        this.cookies.putObject(name + 'Window', properties);
    };
    return PropertiesManager;
}());
export { PropertiesManager };
export var WindowServiceEvent;
(function (WindowServiceEvent) {
    WindowServiceEvent["OPENED"] = "OPENED";
    WindowServiceEvent["CLOSED"] = "CLOSED";
    WindowServiceEvent["SETTED_ON_TOP"] = "SETTED_ON_TOP";
})(WindowServiceEvent || (WindowServiceEvent = {}));
//# sourceMappingURL=../../../src/window/service/WindowService.js.map