import { IDestroyable } from './IDestroyable';

export abstract class IUser implements IDestroyable {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    public id: string | number;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public abstract update(data: any): void;
    public abstract destroy(): void;
}
