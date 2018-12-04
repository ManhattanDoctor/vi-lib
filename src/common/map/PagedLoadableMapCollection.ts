import { ApiResponse } from '../api/ApiResponse';
import { IDestroyable } from '../IDestroyable';
import { ApiBaseLoadableMapCollection } from './ApiBaseLoadableMapCollection';

export abstract class PagedLoadableMapCollection<U extends IDestroyable> extends ApiBaseLoadableMapCollection<U> {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _page: number = 0;
    protected _total: number = 0;
    protected _currentPageItems: Array<U>;

    public itemsOnPage: number = 10;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public reload(): void {
        this._page = 0;
        this._total = 0;
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

    protected parseResponse(response: ApiResponse): void {
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

    protected parseResponseItems(response: ApiResponse): Array<any> {
        let data = response.data;
        return data && data.hasOwnProperty('items') ? data.items : [];
    }

    protected checkIsAllLoaded(response: ApiResponse): void {
        let data = response.data;
        if (data.hasOwnProperty('total')) this._total = data.total;
        this._isAllLoaded = this._total <= this.length;
    }

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
