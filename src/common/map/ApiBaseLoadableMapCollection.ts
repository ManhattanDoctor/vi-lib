import { Observable } from 'rxjs';
import { ApiMethod } from '../api/ApiMethod';
import { ApiResponse } from '../api/ApiResponse';
import { ApiServiceBase } from '../api/ApiServiceBase';
import { IDestroyable } from '../IDestroyable';
import { LoadableMapCollection } from './LoadableMapCollection';

export abstract class ApiBaseLoadableMapCollection<U extends IDestroyable> extends LoadableMapCollection<U> {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    protected api: ApiServiceBase;

    protected requestName: string;
    protected requestMethod: ApiMethod;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(api: ApiServiceBase, requestName?: string, requestMethod?: ApiMethod, uid: string = 'id') {
        super(uid);

        this.api = api;
        this.requestName = requestName;
        this.requestMethod = requestMethod;
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected sort(): void {}

    protected createParamsForRequest(): any {
        return {};
    }

    protected parseErrorResponse(response: ApiResponse): void {}

    protected makeRequest(): Observable<ApiResponse> {
        return this.api.call({ name: this.requestName, method: this.requestMethod, data: this.createParamsForRequest() });
    }

    protected parseResponse(response: ApiResponse): void {
        let array = response.data;
        for (let item of response.data) {
            let value: U = this.parseItem(item);
            if (value) this.add(value);
        }
        this.sort();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this.api = null;
    }
}
