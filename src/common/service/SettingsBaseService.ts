import { UrlUtil } from '../util/UrlUtil';

export class SettingsBaseService {
    //--------------------------------------------------------------------------
    //
    //	Static Properties
    //
    //--------------------------------------------------------------------------

    public static LANGUAGE_SEPARATOR: string = ';';
    public static LANGUAGE_CODE_SEPARATOR: string = '|';

    public static LANGUAGE_RU: string = 'ru';
    public static LANGUAGE_RU_CODE: string = '0';

    public static LANGUAGE_EN: string = 'en';
    public static LANGUAGE_EN_CODE: string = '3';

    //--------------------------------------------------------------------------
    //
    //	Private Properties
    //
    //--------------------------------------------------------------------------

    protected isInitialized: boolean;

    protected _availableLanguages: Map<string, string>;
    protected _defaultLanguage: string = SettingsBaseService.LANGUAGE_EN;
    protected _language: string;

    protected _cookieDomain: string;

    protected _sid: string;
    protected _apiUrl: string;

    protected _assetsUrl: string;
    protected _logoutUrl: string;
    protected _isRunOnServer: boolean;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {}

    //--------------------------------------------------------------------------
    //
    //	Parse Methods
    //
    //--------------------------------------------------------------------------

    protected parseLanguages(value: string): Map<string, string> {
        let map = new Map<string, string>();

        let array: string[] = value.split(SettingsBaseService.LANGUAGE_SEPARATOR);
        array.forEach(function(item) {
            let language = item.split(SettingsBaseService.LANGUAGE_CODE_SEPARATOR);
            if (language.length == 2) map.set(language[0], language[1]);
        });
        return map;
    }

    protected parseLanguage(value: any): string {
        if (value == null) return value;

        value = value.toString();
        if (value == SettingsBaseService.LANGUAGE_EN_CODE) return SettingsBaseService.LANGUAGE_EN;

        if (value == SettingsBaseService.LANGUAGE_RU_CODE) return SettingsBaseService.LANGUAGE_RU;

        return value;
    }

    protected parseUrl(value: any): string {
        return UrlUtil.parseUrl(value);
    }

    protected parseBoolean(value: any): boolean {
        return value == 'true' || value == true;
    }

    protected parseParams(keys: Array<string>, params: any): void {
        for (let name of keys) {
            this.parseParam(name, params[name]);
        }
    }

    protected parseParam(name: string, value: any): void {
        let variable = '_' + name;

        switch (name) {
            case 'apiUrl':
                this[variable] = this.parseUrl(value);
                break;

            case 'isRunOnServer':
            case 'isEthTestNet':
                this[variable] = this.parseBoolean(value);
                break;

            case 'language':
                this._language = this.parseLanguage(value);
                break;

            case 'defaultLanguage':
                this._defaultLanguage = this.parseLanguage(value);
                break;

            case 'availableLanguages':
                this._availableLanguages = this.parseLanguages(value);
                break;

            default:
                this[variable] = value;
                break;
        }
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getParamsFromCookies(): any {}
    protected setParamsToCookies(): any {}

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public initialize(config: any, routerParams: any): void {
        if (this.isInitialized) throw new Error('Service already initialized');
        this.isInitialized = true;

        let params = {};
        Object.assign(params, config);
        Object.assign(params, this.getParamsFromCookies());
        Object.assign(params, routerParams);

        //delete routerParams.sid;

        let keys = Object.keys(params);
        this.parseParams(keys, params);
        this.setParamsToCookies();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get sid(): string {
        return this._sid;
    }
    public get apiUrl(): string {
        return this._apiUrl;
    }
    public get isRunOnServer(): boolean {
        return this._isRunOnServer;
    }
    public get language(): string {
        return this._language;
    }
    public get defaultLanguage(): string {
        return this._defaultLanguage;
    }
    public get assetsUrl(): string {
        return this._assetsUrl;
    }
    public get cookieDomain(): string {
        return this._cookieDomain;
    }
    public get logoutUrl(): string {
        return this._logoutUrl;
    }
    public get availableLanguages(): Map<string, string> {
        return this._availableLanguages;
    }
}
