import { IDestroyable } from '../IDestroyable';
import { MapCollection } from './MapCollection';
export declare class DestroyableMapCollection<U extends IDestroyable> extends MapCollection<U> implements IDestroyable {
    clear(): void;
    remove(key: string): U;
    destroy(): void;
}
