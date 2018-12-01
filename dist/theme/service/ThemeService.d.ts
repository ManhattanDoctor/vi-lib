import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { MapCollection } from '../../common/map/MapCollection';
import { Theme } from '../lib/Theme';
export declare class ThemeService {
    protected cookies: CookieService;
    private _theme;
    private _themes;
    private observer;
    constructor(cookies: CookieService);
    initialize(themes: Array<any>, defaultTheme: string): void;
    getStyle(name: string): any;
    readonly events: Observable<string>;
    readonly themes: MapCollection<Theme>;
    theme: Theme;
}
export declare enum ThemeServiceEvent {
    CHANGED = "changed"
}
