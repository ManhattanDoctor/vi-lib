import { ApiResponse } from '../api/ApiResponse';
import { IDestroyable } from '../IDestroyable';
import { ApiBaseLoadableMapCollection } from './ApiBaseLoadableMapCollection';

export abstract class PagedLoadableMapCollection<U extends IDestroyable, V> extends ApiBaseLoadableMapCollection<U, V> implements IPage{
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _pageSize: number = 0;
    protected _pageIndex: number = 0;
    protected _currentPageItems: Array<U>;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public reload(): void {
        this._length = 0;
        this._pageIndex = 0;
        this._currentPageItems = null;
        super.reload();
    }

    public destroy(): void {
        super.destroy();
        this._page = null;
        this._total = null;
        this._currentPageItems = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected createParamsForRequest(): any {
        let param = super.createParamsForRequest();
        param.itemsOnPage = this.itemsOnPage;
        param.page = this._page;
        return param;
    }

    protected parseResponse(response: ApiResponse<V>): void {
        let items: Array<any> = this.parseResponseItems(response);
        this._isAllLoaded = items.length === 0;

        if (this._isAllLoaded) return;

        this._page++;
        this._currentPageItems = [];
        for (let item of items) {
            let value: U = this.parseItem(item);
            if (value) {
                this.add(value);
                this._currentPageItems.push(value);
            }
        }

        this.checkIsAllLoaded(response);
        this.sort();
    }

    protected parseResponseItems(response: ApiResponse<V>): Array<any> {
        let data = response.data;
        return data && data.hasOwnProperty('items') ? data.items : [];
    }

    protected checkIsAllLoaded(response: ApiResponse<V>): void {
        let data = response.data;
        if (data.hasOwnProperty('total')) this._total = data.total;
        this._isAllLoaded = this._total <= this.length;
    }

    protected updateCollectionLength(): void {}

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get currentPage(): number {
        return Math.max(0, this._page - 1);
    }

    public set currentPage(value: number) {
        if (isNaN(value)) value = 0;

        this._page = value;
        super.reload();
    }

    public get total(): number {
        return this._total;
    }

    public get currentPageItems(): Array<U> {
        return this._currentPageItems;
    }
}
