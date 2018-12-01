import { QuestionMode } from '../../common/IQuestion';
import { WindowConfig } from '../../window/lib/WindowConfig';
export declare class NotificationConfig extends WindowConfig {
    data: any;
    icon: string;
    iconId: string;
    sound: string;
    picture: string;
    mode: QuestionMode;
    noCallback: Function;
    yesCallback: Function;
    closeDuration: number;
    isRemoveAfterClose: boolean;
    constructor(data?: any, picture?: string);
    destroy(): void;
}
