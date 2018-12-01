import { UrlUtil } from '../util/UrlUtil';
import { ViewUtil } from '../util/ViewUtil';
var Assets = (function () {
    function Assets() {
    }
    Assets.initialize = function (url) {
        Assets.URL = url;
    };
    Assets.getIcon = function (name, extension) {
        if (extension === void 0) { extension = 'png'; }
        return Assets.getAssetUrl(name, 'icon', extension);
    };
    Assets.getImage = function (name, extension) {
        if (extension === void 0) { extension = 'png'; }
        return Assets.getAssetUrl(name, 'image', extension);
    };
    Assets.getBackground = function (name, extension) {
        if (extension === void 0) { extension = 'png'; }
        return Assets.getAssetUrl(name, 'background', extension);
    };
    Assets.getVideo = function (name, extension) {
        if (extension === void 0) { extension = 'mp4'; }
        return Assets.getAssetUrl(name, 'video', extension);
    };
    Assets.getSound = function (name, extension) {
        if (extension === void 0) { extension = 'mp3'; }
        return Assets.getAssetUrl(name, 'sound', extension);
    };
    Assets.getFile = function (name, extension) {
        return Assets.getAssetUrl(name, 'file', extension);
    };
    Assets.getAnimation = function (name, extension) {
        if (extension === void 0) { extension = 'swf'; }
        return Assets.getAssetUrl(name, 'animation', extension);
    };
    Assets.playSound = function (name, extension) {
        if (extension === void 0) { extension = 'mp3'; }
        if (!Assets.audio)
            return;
        ViewUtil.setProperty(this.audio, 'src', Assets.getSound(name, extension));
        ViewUtil.playAudio(Assets.audio);
    };
    Assets.createAudioIfNeed = function () {
        if (Assets.audio)
            return;
        Assets.audio = ViewUtil.createElement('audio');
        ViewUtil.playAudio(Assets.audio);
    };
    Assets.getAssetUrl = function (name, folder, extension) {
        var value = Assets.getAssetFolderUrl(folder) + name;
        if (extension)
            value += '.' + extension;
        return value;
    };
    Assets.getAssetFolderUrl = function (name) {
        return UrlUtil.parseUrl(Assets.URL + name);
    };
    Object.defineProperty(Assets, "languagesUrl", {
        get: function () {
            return Assets.assetsUrl + 'language/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assets, "assetsUrl", {
        get: function () {
            return Assets.URL;
        },
        enumerable: true,
        configurable: true
    });
    Assets.URL = '';
    return Assets;
}());
export { Assets };
//# sourceMappingURL=../../../src/common/asset/Assets.js.map