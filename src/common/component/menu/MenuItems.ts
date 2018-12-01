import { LanguageService } from '../../../language/service/LanguageService';
import { DestroyableContainer } from '../../container/DestroyableContainer';
import { LoadableEvent } from '../../lib/Loadable';
import { ArrayUtil } from '../../util/ArrayUtil';
import { IMenuItemCheckEnabledFunction } from './IMenuItemCheckEnabledFunction';
import { MenuItem } from './MenuItem';

export class MenuItems extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _items: Array<MenuItem>;
    protected filterFunction: IMenuItemCheckEnabledFunction;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private language: LanguageService, filterFunction?: IMenuItemCheckEnabledFunction, isAutoTranslate: boolean = false) {
        super();

        this._items = [];
        this.filterFunction = filterFunction;

        this.addSubscription(
            language.events.subscribe(data => {
                if (data.type == LoadableEvent.COMPLETE) {
                    this.items.forEach(item => {
                        if (isAutoTranslate) this.translate(item);
                        else item.name = null;
                    });
                }
            })
        );
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private translate(item: MenuItem): void {
        item.name = this.language.translate(item.nameId);
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public add(item: MenuItem): MenuItem {
        this._items.push(item);
        return item;
    }

    public remove(item: MenuItem): MenuItem {
        let index = this._items.indexOf(item);
        if (index > -1) this._items.slice(index, 1);
        return item;
    }

    public checkEnabled(...args): boolean {
        ArrayUtil.sort(this._items);

        let isAllEnabled = false;
        this.items.forEach(item => {
            if (!item.name && item.nameId) this.translate(item);

            let isEnabled = item.checkEnabled ? item.checkEnabled(item) : true;
            if (isEnabled && this.filterFunction) isEnabled = this.filterFunction(item);

            item.enabled = isEnabled;
            if (isEnabled) isAllEnabled = true;
        });
        return isAllEnabled;
    }

    //--------------------------------------------------------------------------
    //
    //	Interface Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this._items = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get items(): MenuItem[] {
        return this._items;
    }
}
