import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Theme } from '../lib/Theme';
import { ThemeService } from '../service/ThemeService';
export declare class ThemeAssetDirective implements OnDestroy, OnInit {
    protected theme: ThemeService;
    isImage: boolean;
    isBackground: boolean;
    name: string;
    extension: string;
    protected source: string;
    protected element: HTMLElement;
    private isTriedThemeDefault;
    private subscription;
    constructor(element: ElementRef, theme: ThemeService);
    protected getSource(id: string): string;
    private errorLoadingHandler;
    protected errorHandler(event: any): void;
    protected updateSourceProperties(): void;
    protected getSourceId(theme: Theme): string;
    protected getDefaultSourceId(theme: Theme): string;
    protected commitSourceProperties(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
