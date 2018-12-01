import { IDestroyable } from '../IDestroyable';
import { MapCollection } from './MapCollection';

export class DestroyableMapCollection<U extends IDestroyable> extends MapCollection<U> implements IDestroyable {
    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public clear(): void {
        if (this.length > 0)
            this.map.forEach(item => {
                item.destroy();
            });

        super.clear();
    }

    public remove(key: string): U {
        let item = super.remove(key);
        if (item) item.destroy();
        return item;
    }

    public destroy(): void {
        this.clear();
        this.map = null;
        this._collection = null;
    }
}
