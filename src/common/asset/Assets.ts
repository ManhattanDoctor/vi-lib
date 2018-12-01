import { UrlUtil } from '../util/UrlUtil';
import { ViewUtil } from '../util/ViewUtil';

export class Assets {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private static URL: string = '';
    private static audio: HTMLAudioElement;

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public static initialize(url: string): void {
        Assets.URL = url;
    }

    public static getIcon(name: string, extension: string = 'png'): string {
        return Assets.getAssetUrl(name, 'icon', extension);
    }

    public static getImage(name: string, extension: string = 'png'): string {
        return Assets.getAssetUrl(name, 'image', extension);
    }

    public static getBackground(name: string, extension: string = 'png'): string {
        return Assets.getAssetUrl(name, 'background', extension);
    }

    public static getVideo(name: string, extension: string = 'mp4'): string {
        return Assets.getAssetUrl(name, 'video', extension);
    }
    public static getSound(name: string, extension: string = 'mp3'): string {
        return Assets.getAssetUrl(name, 'sound', extension);
    }

    public static getFile(name: string, extension: string): string {
        return Assets.getAssetUrl(name, 'file', extension);
    }

    public static getAnimation(name: string, extension: string = 'swf'): string {
        return Assets.getAssetUrl(name, 'animation', extension);
    }

    public static playSound(name: string, extension: string = 'mp3'): void {
        if (!Assets.audio) return;

        ViewUtil.setProperty(this.audio, 'src', Assets.getSound(name, extension));
        ViewUtil.playAudio(Assets.audio);
    }

    public static createAudioIfNeed(): void {
        if (Assets.audio) return;

        Assets.audio = ViewUtil.createElement('audio');
        ViewUtil.playAudio(Assets.audio);
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    private static getAssetUrl(name: string, folder: string, extension: string): string {
        let value = Assets.getAssetFolderUrl(folder) + name;
        if (extension) value += '.' + extension;
        return value;
    }

    private static getAssetFolderUrl(name: string): string {
        return UrlUtil.parseUrl(Assets.URL + name);
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public static get languagesUrl(): string {
        return Assets.assetsUrl + 'language/';
    }

    public static get assetsUrl(): string {
        return Assets.URL;
    }
}
