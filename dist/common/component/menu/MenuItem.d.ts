import { IMenuItemCheckEnabledFunction } from './IMenuItemCheckEnabledFunction';
import { IMenuItemSelectFunction } from './IMenuItemSelectFunction';
export declare class MenuItem {
    iconId: string;
    flag: MenuItemFlag;
    name: string;
    nameId: string;
    sortIndex: number;
    enabled: boolean;
    select: IMenuItemSelectFunction;
    checkEnabled: IMenuItemCheckEnabledFunction;
    constructor(nameId?: string, sortIndex?: number, flag?: MenuItemFlag, iconId?: string);
}
export declare type MenuItemFlag = 'none' | 'positive' | 'negative' | 'male' | 'female' | 'special';
