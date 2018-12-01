import { ElementRef } from '@angular/core';
var ViewUtil = (function () {
    function ViewUtil() {
    }
    ViewUtil.copyToClipboard = function () {
        try {
            document.execCommand('copy');
        }
        catch (error) { }
    };
    ViewUtil.parseElement = function (element) {
        if (element instanceof HTMLElement)
            return element;
        if (element instanceof ElementRef)
            return element.nativeElement;
        return null;
    };
    ViewUtil.createBase64 = function (element) {
        var value = null;
        var canvas = ViewUtil.createElement('canvas');
        ViewUtil.setProperty(canvas, 'width', element.offsetWidth);
        ViewUtil.setProperty(canvas, 'height', element.offsetHeight);
        try {
            var context = canvas.getContext('2d');
            context.drawImage(element, 0, 0, element.offsetWidth, element.offsetHeight);
            value = canvas.toDataURL('image/jpeg', 1.0);
            value = value.replace('data:image/jpeg;base64,', '');
        }
        catch (error) {
            console.log(error);
        }
        return value;
    };
    ViewUtil.selectContent = function (container, isNeedCopyToClipboard) {
        if (isNeedCopyToClipboard === void 0) { isNeedCopyToClipboard = false; }
        if (container instanceof HTMLInputElement || container instanceof HTMLTextAreaElement) {
            var isDisabled = container.disabled;
            if (isDisabled)
                container.disabled = false;
            container.select();
            if (isNeedCopyToClipboard)
                ViewUtil.copyToClipboard();
            if (isDisabled)
                container.disabled = true;
        }
        else {
            var selection = window.getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(container);
            selection.addRange(range);
            if (isNeedCopyToClipboard)
                ViewUtil.copyToClipboard();
        }
    };
    ViewUtil.setBackground = function (container, value, repeat) {
        if (repeat === void 0) { repeat = 'repeat'; }
        if (!value) {
            ViewUtil.setStyle(container, 'backgroundImage', 'none');
            ViewUtil.setStyle(container, 'backgroundRepeat', 'none');
            return;
        }
        if (value.indexOf('url(') == -1)
            value = 'url(' + value + ')';
        ViewUtil.setStyle(container, 'backgroundImage', value);
        ViewUtil.setStyle(container, 'backgroundRepeat', repeat);
    };
    ViewUtil.createElement = function (name, className, innerHTML) {
        var element = ViewUtil.RENDEDER.createElement(name);
        if (className)
            ViewUtil.setProperty(element, 'className', className);
        if (innerHTML)
            ViewUtil.setProperty(element, 'innerHTML', innerHTML);
        return element;
    };
    ViewUtil.appendChild = function (parent, child) {
        if (parent && child)
            ViewUtil.RENDEDER.appendChild(parent, child);
    };
    ViewUtil.removeChild = function (parent, child) {
        if (parent && child)
            ViewUtil.RENDEDER.removeChild(parent, child);
    };
    ViewUtil.toggleChild = function (container, child, value) {
        var contains = container.contains(child);
        if (value && !contains)
            ViewUtil.appendChild(container, child);
        if (!value && contains)
            ViewUtil.removeChild(container, child);
    };
    Object.defineProperty(ViewUtil, "stageWidth", {
        get: function () {
            return window.innerWidth || document.body.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewUtil, "stageHeight", {
        get: function () {
            return window.innerHeight || document.body.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    ViewUtil.getWidth = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'width'));
        if (isNaN(value))
            value = container.offsetWidth;
        return value;
    };
    ViewUtil.setWidth = function (container, value, isNeedCheckLimits) {
        if (!container || isNaN(value))
            return false;
        if (isNeedCheckLimits && (value < ViewUtil.getMinWidth(container) || value > ViewUtil.getMaxWidth(container) || value == ViewUtil.getWidth(container)))
            return false;
        container.style.width = '540px';
        ViewUtil.setStyle(container, 'width', value + 'px');
        return true;
    };
    ViewUtil.getMaxWidth = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'maxWidth'));
        if (isNaN(value))
            value = Number.POSITIVE_INFINITY;
        return value;
    };
    ViewUtil.getMinWidth = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'minWidth'));
        if (isNaN(value))
            value = 0;
        return value;
    };
    ViewUtil.getHeight = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'height'));
        if (isNaN(value))
            value = container.offsetHeight;
        return value;
    };
    ViewUtil.setHeight = function (container, value, isNeedCheckLimits) {
        if (!container || isNaN(value))
            return false;
        if (isNeedCheckLimits &&
            (value < ViewUtil.getMinHeight(container) || value > ViewUtil.getMaxHeight(container) || value == ViewUtil.getHeight(container)))
            return false;
        ViewUtil.setStyle(container, 'height', value + 'px');
        return true;
    };
    ViewUtil.getMaxHeight = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'maxHeight'));
        if (isNaN(value))
            value = Number.POSITIVE_INFINITY;
        return value;
    };
    ViewUtil.getMinHeight = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'minHeight'));
        if (isNaN(value))
            value = 0;
        return value;
    };
    ViewUtil.size = function (container, width, height, isNeedCheckLimits) {
        ViewUtil.setWidth(container, width, isNeedCheckLimits);
        ViewUtil.setHeight(container, height, isNeedCheckLimits);
    };
    ViewUtil.getX = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'left'));
        return isNaN(value) ? 0 : value;
    };
    ViewUtil.setX = function (container, value) {
        if (container && !isNaN(value))
            ViewUtil.setStyle(container, 'left', value + 'px');
    };
    ViewUtil.getY = function (container) {
        if (!container)
            return NaN;
        var value = parseFloat(ViewUtil.getStyle(container, 'top'));
        return isNaN(value) ? 0 : value;
    };
    ViewUtil.setY = function (container, value) {
        if (container && !isNaN(value))
            ViewUtil.setStyle(container, 'top', value + 'px');
    };
    ViewUtil.move = function (container, x, y) {
        ViewUtil.setX(container, x);
        ViewUtil.setY(container, y);
    };
    ViewUtil.focusInput = function (input) {
        var caretIndex = 0;
        if (input.value)
            caretIndex = Math.max(0, input.value.toString().length);
        input.focus();
        input.setSelectionRange(caretIndex, caretIndex);
    };
    ViewUtil.addClass = function (container, name) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.addClass(container, name);
    };
    ViewUtil.addClasses = function (container, names) {
        if (!names)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            names.split(' ').forEach(function (name) { return ViewUtil.RENDEDER.addClass(container, name); });
    };
    ViewUtil.removeClass = function (container, name) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.removeClass(container, name);
    };
    ViewUtil.removeClasses = function (container, names) {
        if (!names)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            names.split(' ').forEach(function (name) { return ViewUtil.RENDEDER.removeClass(container, name); });
    };
    ViewUtil.hasClass = function (container, name) {
        if (!name)
            return false;
        container = ViewUtil.parseElement(container);
        return container ? container.classList.contains(name) : false;
    };
    ViewUtil.toggleClass = function (container, name, value) {
        if (value)
            ViewUtil.addClass(container, name);
        else
            ViewUtil.removeClass(container, name);
    };
    ViewUtil.getProperty = function (container, name) {
        if (!name)
            return null;
        container = ViewUtil.parseElement(container);
        return container ? container[name] : null;
    };
    ViewUtil.setProperty = function (container, name, value) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.setProperty(container, name, value);
    };
    ViewUtil.removeProperty = function (container, name) {
        ViewUtil.removeAttribute(container, name);
    };
    ViewUtil.removeAttribute = function (container, name) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.removeAttribute(container, name);
    };
    ViewUtil.setAttribute = function (container, name, value) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.setAttribute(container, name, value);
    };
    ViewUtil.getStyle = function (container, name) {
        if (!name)
            return null;
        container = ViewUtil.parseElement(container);
        return container ? container.style[name] : null;
    };
    ViewUtil.setStyle = function (container, name, value) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.setStyle(container, name, value);
    };
    ViewUtil.removeStyle = function (container, name) {
        if (!name)
            return;
        container = ViewUtil.parseElement(container);
        if (container)
            ViewUtil.RENDEDER.removeStyle(container, name);
    };
    ViewUtil.createVideo = function (isMute, isInline) {
        if (isMute === void 0) { isMute = true; }
        if (isInline === void 0) { isInline = false; }
        var video = ViewUtil.createElement('video');
        ViewUtil.setProperty(video, 'autoplay', true);
        if (isMute)
            ViewUtil.setVideoMuteParameters(video, isMute);
        if (isInline)
            ViewUtil.setVideoInlineParameters(video);
        return video;
    };
    ViewUtil.setVideoMuteParameters = function (video, isMute) {
        if (isMute === void 0) { isMute = true; }
        if (video)
            video.muted = video.defaultMuted = isMute;
    };
    ViewUtil.setVideoInlineParameters = function (video) {
        ViewUtil.setAttribute(video, 'webkit-playsinline', 1);
        ViewUtil.setAttribute(video, 'playsinline', true);
    };
    ViewUtil.getVideoError = function (video) {
        if (!video || !video.error)
            return null;
        var error = video.error;
        var value = 'Video error ' + video.src + ', ';
        switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                value += 'media aborted';
                break;
            case MediaError.MEDIA_ERR_DECODE:
                value += 'error to decode';
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                value += 'network error';
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                value += 'source not supported';
                break;
        }
        return value;
    };
    ViewUtil.playVideo = function (video) {
        if (!video)
            return null;
        try {
            return video.play();
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    ViewUtil.playAudio = function (audio) {
        if (!audio)
            return null;
        try {
            return audio.play();
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    ViewUtil.pauseVideo = function (video) {
        if (video)
            video.pause();
    };
    ViewUtil.isVideoPlaying = function (video) {
        return video ? !video.paused && !video.ended : false;
    };
    ViewUtil.loadVideo = function (video) {
        if (video)
            video.load();
    };
    ViewUtil.stopVideoIfNeed = function (video) {
        if (video && (video.src || video.srcObject))
            ViewUtil.stopVideo(video);
    };
    ViewUtil.stopVideo = function (video) {
        if (!video)
            return;
        if (video.srcObject instanceof MediaStream) {
            var tracks = video.srcObject.getTracks();
            tracks.forEach(function (track) { return track.stop(); });
        }
        video.srcObject = null;
        video.pause();
        video.src = '';
        video.load();
    };
    ViewUtil.disposeVideo = function (video) {
        ViewUtil.stopVideo(video);
        ViewUtil.removeChild(video.parentNode, video);
        video.remove();
    };
    ViewUtil.disposeVideos = function (container) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            var item = container.children.item(i);
            if (item instanceof HTMLVideoElement)
                ViewUtil.disposeVideo(item);
        }
    };
    ViewUtil.disposeObjects = function (container, isIEBrowser) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            var item = container.children.item(i);
            if (item instanceof HTMLObjectElement)
                ViewUtil.disposeObject(item, isIEBrowser);
        }
    };
    ViewUtil.disposeObject = function (object, isIEBrowser) {
        if (isIEBrowser && object.readyState == 4) {
            for (var i in object)
                if (typeof object[i] == 'function')
                    object[i] = null;
        }
        ViewUtil.removeChild(object.parentNode, object);
    };
    ViewUtil.FOCUS_DELAY = 100;
    ViewUtil.VIDEO_RATIO = 3 / 4;
    return ViewUtil;
}());
export { ViewUtil };
//# sourceMappingURL=../../../src/common/util/ViewUtil.js.map