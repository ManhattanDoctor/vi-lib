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
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ApiError } from '../../common/api/ApiError';
import { Assets } from '../../common/asset/Assets';
import { ObservableData } from '../../common/observer/ObservableData';
import { ArrayUtil } from '../../common/util/ArrayUtil';
import { LanguageService } from '../../language/service/LanguageService';
import { INotification } from '../lib/INotification';
import { NotificationConfig } from '../lib/NotificationConfig';
var NotificationService = (function () {
    function NotificationService(dialog, language) {
        this.dialog = dialog;
        this.language = language;
        this._configs = [];
        this._notifications = new Map();
        this.observer = new Subject();
    }
    NotificationService_1 = NotificationService;
    NotificationService.prototype.get = function (id) {
        var result = null;
        if (this._configs.length > 0) {
            this._configs.some(function (item) {
                if (item.id === id) {
                    result = item;
                    return true;
                }
            });
        }
        if (!result && this.notifications.size > 0) {
            this.notifications.forEach(function (content, config) {
                if (config.id === id)
                    result = config;
            });
        }
        return result;
    };
    NotificationService.prototype.openNotification = function (component, config) {
        var _this = this;
        var notification = null;
        if (config.id) {
            notification = this.notifications[config.id];
            if (notification)
                return notification.content;
        }
        if (!config.defaultMinWidth)
            config.defaultMinWidth = NotificationService_1.DEFAULT_MIN_WIDTH;
        if (!config.defaultMinHeight)
            config.defaultMinHeight = NotificationService_1.DEFAULT_MIN_HEIGHT;
        if (!config.verticalAlign)
            config.verticalAlign = NotificationService_1.DEFAULT_VERTICAL_ALIGN;
        if (!config.horizontalAlign)
            config.horizontalAlign = NotificationService_1.DEFAULT_HORIZONTAL_ALIGN;
        if (isNaN(config.paddingTop))
            config.paddingTop = NotificationService_1.DEFAULT_PADDING_TOP;
        if (isNaN(config.paddingLeft))
            config.paddingLeft = NotificationService_1.DEFAULT_PADDING_LEFT;
        if (isNaN(config.paddingRight))
            config.paddingRight = NotificationService_1.DEFAULT_PADDING_RIGHT;
        if (isNaN(config.paddingBottom))
            config.paddingBottom = NotificationService_1.DEFAULT_PADDING_BOTTOM;
        config.setDefaultProperties();
        var reference = this.dialog.open(component, config);
        notification = this.factory.create(reference, config, reference['_overlayRef']);
        var content = notification.content;
        var subscription = notification.events.subscribe(function (data) {
            if (data == INotification.EVENT_REMOVED) {
                subscription.unsubscribe();
                _this.remove(config);
            }
            else if (data == INotification.EVENT_CLOSED) {
                _this.close(config);
            }
            else if (data == INotification.EVENT_OPENED) {
                _this.add(config, reference.componentInstance);
                _this.checkNotificationPosition(notification);
                if (config.sound)
                    Assets.playSound(config.sound);
            }
        });
        return content;
    };
    NotificationService.prototype.add = function (config, content) {
        if (content) {
            this._configs.push(config);
            this.observer.next(new ObservableData(NotificationServiceEvent.ADDED, config));
        }
        this._notifications.set(config, content);
        this.observer.next(new ObservableData(NotificationServiceEvent.OPENED, content.notification));
    };
    NotificationService.prototype.remove = function (config) {
        this.close(config);
        ArrayUtil.remove(this._configs, config);
        this.observer.next(new ObservableData(NotificationServiceEvent.REMOVED, config));
        config.destroy();
    };
    NotificationService.prototype.removeById = function (id) {
        var _this = this;
        if (this._configs.length > 0)
            return;
        this._configs.forEach(function (config) {
            if (config.id && config.id === id)
                _this.remove(config);
        });
    };
    NotificationService.prototype.close = function (config) {
        var item = this._notifications.get(config);
        if (!item)
            return null;
        item.close();
        this._notifications.delete(config);
        this.observer.next(new ObservableData(NotificationServiceEvent.CLOSED, item.notification));
    };
    NotificationService.prototype.checkNotificationPosition = function (notification) {
        while (this.hasNotificationWithSamePosition(notification))
            notification.setY(notification.getY() + NotificationService_1.GAP);
    };
    NotificationService.prototype.hasNotificationWithSamePosition = function (itemNotification) {
        var y = itemNotification.getY();
        var result = false;
        this._notifications.forEach(function (content, config) {
            var notification = content.notification;
            if (notification != itemNotification && y == notification.getY())
                result = true;
        });
        return result;
    };
    NotificationService.prototype.open = function (config) {
        config.isModal = false;
        return this.openNotification(this.defaultNotification, config);
    };
    NotificationService.prototype.errorTranslate = function (translationId, translation) {
        this.error(this.language.translate(translationId, translation));
    };
    NotificationService.prototype.error = function (error) {
        if (!error)
            return;
        var config = new NotificationConfig();
        config.closeDuration = NotificationService_1.DEFAULT_ERROR_DURATION;
        config.iconId = NotificationService_1.DEFAULT_ERROR_ICON_ID;
        if (typeof error === 'string')
            config.data = error;
        else if (error instanceof Error || error instanceof ApiError)
            config.data = error.message;
        this.open(config);
    };
    NotificationService.prototype.infoTranslate = function (translationId, translation, picture, closeDuration, removeAfterClose, iconId) {
        this.info(this.language.translate(translationId, translation), picture, closeDuration, removeAfterClose, iconId);
    };
    NotificationService.prototype.info = function (text, picture, closeDuration, removeAfterClose, iconId) {
        if (closeDuration === void 0) { closeDuration = NaN; }
        if (!text)
            return;
        var config = new NotificationConfig();
        config.data = text;
        config.iconId = iconId || NotificationService_1.DEFAULT_INFO_ICON_ID;
        config.closeDuration = !isNaN(closeDuration) ? closeDuration : NotificationService_1.DEFAULT_INFO_DURATION;
        config.isRemoveAfterClose = removeAfterClose;
        if (picture)
            config.picture = picture;
        this.open(config);
    };
    Object.defineProperty(NotificationService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationService.prototype, "notifications", {
        get: function () {
            return this._notifications;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationService.prototype, "configs", {
        get: function () {
            return this._configs;
        },
        enumerable: true,
        configurable: true
    });
    var NotificationService_1;
    NotificationService.GAP = 25;
    NotificationService.DEFAULT_INFO_ICON_ID = 'error_outline';
    NotificationService.DEFAULT_ERROR_ICON_ID = 'info_outline';
    NotificationService.DEFAULT_INFO_DURATION = 5000;
    NotificationService.DEFAULT_ERROR_DURATION = 5000;
    NotificationService.DEFAULT_PADDING_TOP = 25;
    NotificationService.DEFAULT_PADDING_LEFT = 25;
    NotificationService.DEFAULT_PADDING_RIGHT = 25;
    NotificationService.DEFAULT_PADDING_BOTTOM = 25;
    NotificationService.DEFAULT_MIN_WIDTH = 25;
    NotificationService.DEFAULT_MIN_HEIGHT = 25;
    NotificationService.DEFAULT_VERTICAL_ALIGN = 'start';
    NotificationService.DEFAULT_HORIZONTAL_ALIGN = 'end';
    NotificationService = NotificationService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MatDialog, LanguageService])
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
export var NotificationServiceEvent;
(function (NotificationServiceEvent) {
    NotificationServiceEvent["OPENED"] = "OPENED";
    NotificationServiceEvent["CLOSED"] = "CLOSED";
    NotificationServiceEvent["ADDED"] = "ADDED";
    NotificationServiceEvent["REMOVED"] = "REMOVED";
})(NotificationServiceEvent || (NotificationServiceEvent = {}));
//# sourceMappingURL=../../../src/notification/service/NotificationService.js.map