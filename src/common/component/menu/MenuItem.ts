import { MenuItemBase } from '@vi-lib/common/component/menu/MenuItemBase';

export class MenuItem extends MenuItemBase {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public flag: MenuItemFlag;
    public select: (item: MenuItem) => void;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(nameId?: string, sortIndex?: number, flag?: MenuItemFlag, iconId?: string) {
        super(nameId, sortIndex, iconId);
        this.flag = flag || 'none';
    }
}

export declare type MenuItemFlag = 'none' | 'positive' | 'negative' | 'male' | 'female' | 'special';
