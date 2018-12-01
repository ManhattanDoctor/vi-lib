import { ApiResponse } from '../api/ApiResponse';
import { IDestroyable } from '../IDestroyable';
import { ApiBaseLoadableMapCollection } from './ApiBaseLoadableMapCollection';
export declare abstract class PagedLoadableMapCollection<U extends IDestroyable> extends ApiBaseLoadableMapCollection<U> {
    protected _page: number;
    protected _total: number;
    protected _currentPageItems: Array<U>;
    itemsOnPage: number;
    reload(): void;
    destroy(): void;
    protected createParamsForRequest(): any;
    protected parseResponse(response: ApiResponse): void;
    protected parseResponseItems(response: ApiResponse): Array<any>;
    protected checkIsAllLoaded(response: ApiResponse): void;
    currentPage: number;
    readonly total: number;
    readonly currentPageItems: Array<U>;
}
