import { IMenuItemCheckEnabledFunction } from './IMenuItemCheckEnabledFunction';
import { IMenuItemSelectFunction } from './IMenuItemSelectFunction';

export class MenuItem {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public iconId: string;
    public flag: MenuItemFlag;

    public name: string;
    public nameId: string;

    public sortIndex: number;
    public enabled: boolean = true;

    public select: IMenuItemSelectFunction;
    public checkEnabled: IMenuItemCheckEnabledFunction;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(nameId?: string, sortIndex?: number, flag?: MenuItemFlag, iconId?: string) {
        this.nameId = nameId;
        this.sortIndex = sortIndex;

        this.flag = flag || 'none';
        this.iconId = iconId;
    }
}

export declare type MenuItemFlag = 'none' | 'positive' | 'negative' | 'male' | 'female' | 'special';
