import { ApiMethod } from './ApiMethod';
export interface IApiRequestConfig {
    data?: any;
    name: string;
    idleTimeout?: number;
    isHandleError?: boolean;
    isHandleLoading?: boolean;
    method?: ApiMethod;
    responseType?: string;
}
