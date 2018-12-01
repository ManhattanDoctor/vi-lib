import { IWindow } from './IWindow';
import { WindowConfig } from './WindowConfig';
import { WindowProperties } from './WindowProperties';
export declare class WindowFactory<U extends IWindow> {
    protected classType: any;
    constructor(classType: any);
    create(properties: WindowProperties): U;
    createConfig(isModal?: boolean, isResizeable?: boolean, width?: number, height?: number): WindowConfig;
}
