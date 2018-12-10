import { Observable } from 'rxjs';
import { ApiMethod } from '../api/ApiMethod';
import { ApiResponse } from '../api/ApiResponse';
import { ApiServiceBase } from '../api/ApiServiceBase';
import { LoadableMapCollection } from './LoadableMapCollection';

export abstract class ApiBaseLoadableMapCollection<U, V> extends LoadableMapCollection<U> {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected api: ApiServiceBase;

    protected requestName: string;
    protected requestMethod: ApiMethod;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(api: ApiServiceBase, requestName?: string, requestMethod?: ApiMethod) {
        super('coinId');

        this.api = api;
        this.requestName = requestName;
        this.requestMethod = requestMethod;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected sort(): void {}

    protected createParamsForRequest(): any {
        return {};
    }

    protected parseErrorResponse(response: ApiResponse<Array<V>>): void {}

    protected makeRequest(): Observable<ApiResponse<Array<V>>> {
        return this.api.call({
            name: this.requestName,
            method: this.requestMethod,
            data: this.createParamsForRequest()
        });
    }

    protected parseResponse(response: ApiResponse<Array<V>>): void {
        for (let item of response.data) {
            let value: U = this.parseItem(item);
            if (value) {
                this.add(value);
            }
        }
        this.sort();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this.api = null;
    }
}
