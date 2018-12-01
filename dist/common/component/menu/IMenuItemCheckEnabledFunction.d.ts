import { MenuItem } from './MenuItem';
export interface IMenuItemCheckEnabledFunction {
    (item: MenuItem): boolean;
}
