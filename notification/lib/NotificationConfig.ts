import { QuestionMode } from '../../common/IQuestion';
import { WindowConfig } from '../../window/lib/WindowConfig';

export class NotificationConfig extends WindowConfig {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public data: any;
    public icon: string;
    public iconId: string;
    public sound: string;
    public picture: string;
    public mode: QuestionMode = 'info';

    public noCallback: (...args) => any;
    public yesCallback: (...args) => any;

    public closeDuration: number;
    public isRemoveAfterClose: boolean = false;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data?: any, picture?: string) {
        super();
        this.data = data;
        this.picture = picture;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();

        this.noCallback = null;
        this.yesCallback = null;
    }
}
