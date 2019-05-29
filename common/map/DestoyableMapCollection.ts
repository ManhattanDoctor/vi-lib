import { IDestroyable } from '../IDestroyable';
import { MapCollection } from './MapCollection';

export class DestroyableMapCollection<U> extends MapCollection<U> implements IDestroyable {
    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    private destroyItem = (item: any): void => {
        if (item && 'destroy' in item) {
            item.destroy();
        }
    };

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public clear(): void {
        this.map.forEach(this.destroyItem);
        super.clear();
    }

    public remove(key: string): U {
        let item = super.remove(key);
        if (item) {
            this.destroyItem(item);
        }
        return item;
    }

    public destroy(): void {
        this.clear();
        this.map = null;
        this._collection = null;
    }
}
