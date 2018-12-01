import { ControlValueAccessor } from '@angular/forms';
export declare class ValueAccessor<T> implements ControlValueAccessor {
    private innerValue;
    private changed;
    private touched;
    protected valueChanged(): void;
    value: T;
    touch(): void;
    writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
}
