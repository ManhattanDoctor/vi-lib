import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assets } from '../../common/asset/Assets';
import { StringUtil } from '../../common/util/StringUtil';
import { Theme } from '../lib/Theme';
import { ThemeService, ThemeServiceEvent } from '../service/ThemeService';

@Directive({
    selector: '[theme-asset]'
})
export class ThemeAssetDirective implements OnDestroy, OnInit {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @Input()
    public isImage: boolean = false;
    @Input()
    public isBackground: boolean = false;

    @Input()
    public name: string;
    @Input()
    public extension: string = 'png';

    protected source: string;
    protected element: HTMLElement;

    private isTriedThemeDefault: boolean;
    private subscription: Subscription;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, protected theme: ThemeService) {
        this.element = element.nativeElement;
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected getSource(id: string): string {
        if (!id) return null;

        if (this.isImage) return Assets.getImage(id, this.extension);

        if (this.isBackground) return Assets.getBackground(id, this.extension);

        return Assets.getIcon(id, this.extension);
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    @HostListener('error', ['$event'])
    private errorLoadingHandler(event: any): void {
        this.errorHandler(event);
    }

    protected errorHandler(event: any): void {
        if (this.isTriedThemeDefault) return;

        this.isTriedThemeDefault = true;
        this.source = this.getSource(this.getDefaultSourceId(this.theme.theme));
        this.commitSourceProperties();
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected updateSourceProperties(): void {
        this.source = this.getSource(this.getSourceId(this.theme.theme));
        this.commitSourceProperties();
    }

    protected getSourceId(theme: Theme): string {
        return this.name + StringUtil.capitalizeFirstLetter(theme.name);
    }

    protected getDefaultSourceId(theme: Theme): string {
        let value = this.name;
        value += theme.isDark ? 'Dark' : 'Light';
        return value;
    }

    protected commitSourceProperties(): void {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngOnInit(): void {
        this.updateSourceProperties();

        this.subscription = this.theme.events.subscribe(event => {
            if (event === ThemeServiceEvent.CHANGED) {
                this.isTriedThemeDefault = false;
                this.updateSourceProperties();
            }
        });
    }

    public ngOnDestroy(): void {
        this.theme = null;
        this.element = null;

        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
