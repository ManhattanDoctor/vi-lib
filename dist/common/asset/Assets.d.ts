export declare class Assets {
    private static URL;
    private static audio;
    static initialize(url: string): void;
    static getIcon(name: string, extension?: string): string;
    static getImage(name: string, extension?: string): string;
    static getBackground(name: string, extension?: string): string;
    static getVideo(name: string, extension?: string): string;
    static getSound(name: string, extension?: string): string;
    static getFile(name: string, extension: string): string;
    static getAnimation(name: string, extension?: string): string;
    static playSound(name: string, extension?: string): void;
    static createAudioIfNeed(): void;
    private static getAssetUrl;
    private static getAssetFolderUrl;
    static readonly languagesUrl: string;
    static readonly assetsUrl: string;
}
