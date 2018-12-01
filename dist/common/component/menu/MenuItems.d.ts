import { LanguageService } from '../../../language/service/LanguageService';
import { DestroyableContainer } from '../../container/DestroyableContainer';
import { IMenuItemCheckEnabledFunction } from './IMenuItemCheckEnabledFunction';
import { MenuItem } from './MenuItem';
export declare class MenuItems extends DestroyableContainer {
    private language;
    protected _items: Array<MenuItem>;
    protected filterFunction: IMenuItemCheckEnabledFunction;
    constructor(language: LanguageService, filterFunction?: IMenuItemCheckEnabledFunction, isAutoTranslate?: boolean);
    private translate;
    add(item: MenuItem): MenuItem;
    remove(item: MenuItem): MenuItem;
    checkEnabled(...args: any[]): boolean;
    destroy(): void;
    readonly items: MenuItem[];
}
