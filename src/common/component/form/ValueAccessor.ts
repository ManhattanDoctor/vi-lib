import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessor<T> implements ControlValueAccessor {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    private innerValue: T;
    private changed = new Array<(value: T) => void>();
    private touched = new Array<() => void>();

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected valueChanged(): void {
        this.changed.forEach(f => f(this.innerValue));
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public get value(): T {
        return this.innerValue;
    }

    public set value(value: T) {
        if (value == this.innerValue) return;

        this.innerValue = value;
        this.valueChanged();
    }

    public touch(): void {
        this.touched.forEach(f => f());
    }

    public writeValue(value: T): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: T) => void): void {
        this.changed.push(fn);
    }

    public registerOnTouched(fn: () => void): void {
        this.touched.push(fn);
    }
}
