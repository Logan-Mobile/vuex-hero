declare interface Alley {
    oldVal: any,
    newVal: any,
    setState: () => void,
    state: object,
    rootState: object,
    unwatch: () => void,
}

export interface WatchOptions {
    deep?: boolean;
    immediate?: boolean;
}

type Rule = object

export interface Module {
    state: object,
    store: object,
    registerModule: (replace: boolean) => Module,
    unregisterModule: () => Module,
    validate: (formName: string | ((result) => void), validateCB: ((result) => void)) => void,
}

declare class h {
    static createModule(path: string | [], module: object): Module

    static init(initValue: any): h

    static strLoad<S extends object, T extends any>(cb: (alley: Alley) => void): h

    static arrLoad<S extends object, T extends any>(cb: (alley: Alley) => void): h

    static strGetter<S extends object, T extends any>(getter: (state: S, rootState: S) => T, options?: WatchOptions): h

    static arrGetter<S extends object, T extends any>(getter: (state: S, rootState: S) => T, options?: WatchOptions): h

    static strWatch<S extends object, T extends any>(expOrFn: ((state: S, rootState: S) => T) | string | [], cb: (alley: Alley) => void, options?: WatchOptions): h

    static arrWatch<S extends object, T extends any>(expOrFn: ((state: S, rootState: S) => T) | string | [], cb: (alley: Alley) => void, options?: WatchOptions): h

    static strWatchSelf<S extends object, T extends any>(cb: (alley: Alley) => void, options?: WatchOptions): h

    static arrWatchSelf<S extends object, T extends any>(cb: (alley: Alley) => void, options?: WatchOptions): h

    static strValidate<S extends object, T extends any>(expOrFn: ((state: S, rootState: S) => T) | string | [], ruleOrCallBack: (alley: Alley) => void | Rule, formName?: string): h

    load<S extends object, T extends any>(cb: (alley: Alley) => void): h

    getter<S extends object, T extends any>(getter: (state: S, rootState: S) => T, options?: WatchOptions): h

    watch<S extends object, T extends any>(expOrFn: ((state: S, rootState: S) => T) | string | [], cb: (alley: Alley) => void, options?: WatchOptions): h;

    watchSelf<S extends object, T extends any>(cb: (alley: Alley) => void, options?: WatchOptions): h;

    validate<S extends object, T extends any>(expOrFn: ((state: S, rootState: S) => T) | string | [], ruleOrCB: (alley: Alley) => void | Rule, options?: WatchOptions): h;
}

export declare function createVuexHero(store: object): void

export declare function createModule(path: string | [], module: object): Module

export default h;
