import { MenuItem } from './MenuItem';

export interface IMenuItemSelectFunction {
    (item: MenuItem): void;
}
