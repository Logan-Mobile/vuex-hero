import Schema from 'async-validator';
import assert from 'assert'

let rootStore = null

const _operations = new WeakMap();

function pushOperation(key, operation) {
    let arr = getOperations(key);
    arr.push(operation)
    _operations.set(key, arr)
}

function getOperations(key) {
    return _operations.has(key) ? _operations.get(key) : []
}

function expOrFn2Getter(expOrFn) {
    if (typeof expOrFn === 'string') {
        if (expOrFn.includes('.')) {
            return (state, rootState) => {
                return expOrFn.split('.').reduce((root, key) => {
                    return root[key]
                }, rootState)
            }
        } else {
            return (state) => {
                return state[expOrFn]
            }
        }
    } else if (Array.isArray(expOrFn)) {
        const callBacks = expOrFn.map((exp) => expOrFn2Getter(exp))
        return (state, rooState) => {
            return callBacks.map((getter) => {
                return getter(state, rooState)
            })
        }
    } else {
        return expOrFn
    }
}

function ruleOrCB2CallBack(ruleOrCB) {
    if (typeof ruleOrCB === 'function') return ruleOrCB;
    let rule = ruleOrCB;
    return ({value, setState}) => {
        (new Schema({value: rule})).validate({value: value}, {suppressWarning: true}, (errors, fields) => {
            let errorMessage = ''
            if (errors) {
                errorMessage = errors[0].message
            }
            setState(errorMessage)
        })
    }
}

export function createVuexHero(store) {
    rootStore = store;
}

function checkFn(fn) {
    assert(typeof fn === 'function', 'callback must be a function')
}

function checkGetter(getter) {
    assert(typeof getter === 'function', 'getter must be a function')
}

function checkExpOrFn(expOrFn, isDeep) {
    if (!isDeep && Array.isArray(expOrFn)) {
        expOrFn.forEach((item) => {
            checkExpOrFn(item, true)
        })
    } else {
        let type = typeof expOrFn
        assert((type === 'function' || type === 'string'), 'expOrFn must be a string or function or array')
    }
}

function checkRuleOrCB(ruleOrCallBack) {
    const type = typeof ruleOrCallBack
    assert((type === 'function' || type === 'object'), 'expOrFn must be a object or function')
}

export function createModule(path, module) {
    if (!rootStore) throw new Error(`please call 'createVuexHero' first`);

    class Module {
        #path = ''
        #form = {}
        #module = {}
        #unwatches = []
        #observers = {}
        #subModules = []
        state = {}

        get store() {
            return rootStore
        }

        constructor(path, module) {
            this.#init(path, module)
            this.unregisterModule = function () {
                if (this.store.hasModule(this.#path)) {
                    this.#subModules.forEach(subM => subM.unregisterModule())
                    this.#unwatches.forEach((unwatch) => {
                        unwatch()
                    })
                    this.store.unregisterModule(this.#path)
                }
                this.#init(path, module)
                return this
            }
        }

        #init(path, module) {
            this.#path = ''
            this.#form = {}
            this.#module = {}
            this.#unwatches = []
            this.#observers = {}
            this.#subModules = []
            this.state = {}

            this.#path = Array.isArray(path) ? path : path.split('.')
            this.#initModule(module)
        }

        #initModule(module) {
            const virState = module.state;
            Object.keys(virState).forEach((key) => {
                if (virState[key] instanceof h) {
                    this.state[key] = virState[key]._initValue
                    this.#observers[key] = getOperations(virState[key])
                } else {
                    this.state[key] = virState[key]
                }
            })
            this.#module = {...module, state: this.state, modules: undefined}

            const subModules = module.modules || {};
            Object.keys(subModules).forEach((key) => {
                const subM = new Module([...this.#path, key], subModules[key])
                this.#subModules.push(subM)
                this[key] = subM
                subModules[key].state = subM.state;
            })
        }

        #beginObserve() {
            setTimeout(() => {
                        Object.keys(this.#observers).forEach((key) => {
                            const setState = (value) => {
                                this.state[key] = value
                            }
                            const rootState = this.store.state;

                            this.#observers[key].forEach((watch) => {
                                let {
                                    getter = (s) => {
                                        return s[key]
                                    },
                                    callBack,
                                    options
                                } = watch;

                                /**
                                 * load
                                 * */
                                if (options.isLoad) {
                                    callBack({state: this.state, rootState, setState})
                                    return
                                }

                                /**
                                 * validation
                                 * */
                                if (options.isValidation) {
                                    if (!this.#form[options.formName]) this.#form[options.formName] = {}
                                    this.#form[options.formName][key] = {getter, callBack}
                                }

                                /**
                                 * watch
                                 * */
                                        // 解决unwatch可能为undefined问题
                                let stopCall = false;
                                const preUnwatch = () => {
                                    stopCall = true
                                    if (unwatch) {
                                        unwatch()
                                    } else {
                                        setTimeout(() => {
                                            preUnwatch()
                                        }, 0)
                                    }
                                }

                                const unwatch = this.store.watch(
                                        () => {
                                            return getter(this.state, rootState)
                                        },
                                        (newVal, oldVal) => {
                                            if (stopCall) return
                                            callBack({
                                                value: newVal,
                                                oldVal,
                                                setState,
                                                state: this.state,
                                                rootState,
                                                unwatch: preUnwatch
                                            })
                                        },
                                        options
                                )
                                this.#unwatches.push(unwatch)
                            })
                        })
                    },
                    0
            )
        }

        registerModule(replace) {
            const register = () => {
                this.store.registerModule(this.#path, this.#module)
                this.#beginObserve()
                this.#subModules.forEach(subM => subM.registerModule(replace))
            }

            if (replace) {
                this.unregisterModule()
                register()
            } else {
                if (!this.store.hasModule(this.#path)) {
                    register()
                }
            }
            return this;
        }

        validate(formName, validateCB) {
            if (typeof formName === 'function') {
                validateCB = formName
                formName = null
            }
            let promiseArr = []
            Object.keys(this.#form).forEach((currentFormName) => {
                if (formName && currentFormName !== formName) return
                let formTeam = this.#form[currentFormName]

                Object.keys(formTeam).forEach((key) => {
                    const {getter, callBack} = formTeam[key]
                    promiseArr.push(new Promise((resolve, reject) => {
                        callBack({
                            value: getter(this.state, this.store.state),
                            setState: (result) => {
                                this.state[key] = result
                                if (result) {
                                    reject()
                                } else {
                                    resolve()
                                }
                            },
                            state: this.state,
                            rootState: this.store.state
                        })
                    }))
                })
            })
            Promise.all(promiseArr).then(() => {
                validateCB && validateCB(true)
            }).catch(() => {
                validateCB && validateCB(false)
            })
        }
    }

    return new Module(path, module)
}

class h {
    static init(initValue) {
        assert(initValue !== undefined, 'initValue can\'t be undefined')
        return new h(initValue)
    }

    static strLoad(callBack) {
        checkFn(callBack)
        return new h('').load(callBack)
    }

    static arrLoad(callBack) {
        checkFn(callBack)
        return new h([]).load(callBack)
    }

    static strGetter(getter, options = {immediate: true, deep: false}) {
        checkGetter(getter)
        return new h('').getter(getter, options)
    }

    static arrGetter(getter, options = {immediate: true, deep: false}) {
        checkGetter(getter)
        return new h([]).getter(getter, options)
    }

    static strWatch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        checkExpOrFn(expOrFn)
        checkFn(callBack)
        return new h('').watch(expOrFn, callBack, options)
    }

    static arrWatch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        checkExpOrFn(expOrFn)
        checkFn(callBack)
        return new h([]).watch(expOrFn, callBack, options)
    }

    static strWatchSelf(callBack, options = {immediate: true, deep: false}) {
        checkFn(callBack)
        return new h('').watchSelf(callBack)
    }

    static arrWatchSelf(callBack, options = {immediate: true, deep: false}) {
        checkFn(callBack)
        return new h([]).watchSelf(callBack)
    }

    static strValidate(expOrFn, ruleOrCallBack, formName) {
        checkExpOrFn(expOrFn)
        checkRuleOrCB(ruleOrCallBack)
        return new h('').validate(expOrFn, ruleOrCallBack, formName)
    }

    constructor(initValue) {
        assert(initValue !== undefined, 'initValue can\'t be undefined')
        this._initValue = initValue;
    }

    load(callBack) {
        checkFn(callBack)
        pushOperation(this, {callBack, options: {isLoad: true}})
        return this;
    }

    getter(getter, options = {immediate: true, deep: false}) {
        checkGetter(getter)
        pushOperation(this, {
            getter, callBack: ({value, setState}) => {
                setState(value)
            }, options: {...options, isGetter: true}
        })
        return this;
    }

    watch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        checkExpOrFn(expOrFn)
        checkFn(callBack)
        pushOperation(this, {
            getter: expOrFn2Getter(expOrFn), callBack, options
        })
        return this;
    }

    watchSelf(callBack, options = {immediate: true, deep: false}) {
        checkFn(callBack)
        pushOperation(this, {
            callBack, options
        })
        return this;
    }

    validate(expOrFn, ruleOrCallBack, formName) {
        checkExpOrFn(expOrFn)
        checkRuleOrCB(ruleOrCallBack)
        pushOperation(this, {
            getter: expOrFn2Getter(expOrFn),
            callBack: ruleOrCB2CallBack(ruleOrCallBack),
            options: {immediate: false, deep: false, isValidation: true, formName: formName || 'noFormName'}
        })
        return this;
    }
}

export default h
