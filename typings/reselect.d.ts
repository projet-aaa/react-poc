declare module Reselect {
    function createSelector(...args: any[]): any;
}

declare module "reselect" {
    export = Reselect;
}