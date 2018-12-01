import { IDestroyable } from './IDestroyable';
export declare abstract class IUser implements IDestroyable {
    id: string;
    abstract update(data: any): void;
    abstract destroy(): void;
}
