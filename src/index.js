import Schema from 'async-validator';

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
    } else {
        return expOrFn
    }
}

function ruleOrCB2CallBack(ruleOrCB) {
    if (typeof ruleOrCB === 'function') return ruleOrCB;
    let rule = ruleOrCB;
    return (newVal, setState, state, rootState) => {
        (new Schema({value: rule})).validate({value: newVal}, {suppressWarning: true}, (errors, fields) => {
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

export function createModule(path, module) {
    if (!rootStore) throw new Error(`请先调用'createVuexHero'方法`);

    class Module {
        #form = {}
        #module = {}
        #path = ''
        #unwatches = []
        #observers = {}
        #subModules = []

        constructor(path, module) {
            this.#path = Array.isArray(path) ? path : path.split('.')
            this.state = {};
            this.#initModule(module)
        }

        get store() {
            return rootStore
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
                                    callBack(this.state, rootState, setState)
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
                                 * watch listen
                                 * */
                                const unwatch = this.store.watch(
                                        () => {
                                            return getter(this.state, rootState)
                                        },
                                        (newVal, oldVal) => {
                                            let actuator = () => {
                                                if (options.isValidation) {
                                                    callBack(newVal, setState, this.state, rootState, unwatch)
                                                } else {
                                                    callBack(newVal, oldVal, setState, this.state, rootState, unwatch)
                                                }
                                            }
                                            if (!unwatch) {
                                                setTimeout(() => {
                                                    actuator()
                                                }, 0)
                                            } else {
                                                actuator()
                                            }
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

        unregisterModule() {
            if (this.store.hasModule(this.#path)) {
                this.#subModules.forEach(subM => subM.unregisterModule())
                this.#unwatches.forEach((unwatch) => {
                    unwatch()
                })
                this.store.unregisterModule(this.#path)
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
                        callBack(
                                getter(this.state, this.store.state),
                                (result) => {
                                    this.state[key] = result
                                    if (result) {
                                        reject()
                                    } else {
                                        resolve()
                                    }
                                }, this.state, this.store.state)
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
        return new h(initValue)
    }

    static srtLoad(callBack) {
        return new h('').load(callBack)
    }

    static arrLoad(callBack) {
        return new h([]).load(callBack)
    }

    static strGetter(getter, options = {immediate: true, deep: false}) {
        return new h('').getter(getter, options)
    }

    static arrGetter(getter, options = {immediate: true, deep: false}) {
        return new h([]).getter(getter, options)
    }

    static strWatch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        return new h('').watch(expOrFn, callBack, options)
    }

    static arrWatch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        return new h([]).watch(expOrFn, callBack, options)
    }

    static strListen(callBack, options = {immediate: true, deep: false}) {
        return new h('').listen(callBack)
    }

    static arrListen(callBack, options = {immediate: true, deep: false}) {
        return new h([]).listen(callBack)
    }

    static strValidate(expOrFn, ruleOrCallBack, formName) {
        return new h('').validate(expOrFn, ruleOrCallBack, formName)
    }

    constructor(initValue) {
        this._initValue = initValue;
    }

    load(callBack) {
        pushOperation(this, {callBack, options: {isLoad: true}})
        return this;
    }

    getter(getter, options = {immediate: true, deep: false}) {
        pushOperation(this, {
            getter, callBack: (newVal, oldVal, setState) => {
                setState(newVal)
            }, options: {...options, isGetter: true}
        })
        return this;
    }

    watch(expOrFn, callBack, options = {immediate: true, deep: false}) {
        pushOperation(this, {
            getter: expOrFn2Getter(expOrFn), callBack, options
        })
        return this;
    }

    listen(callBack, options = {immediate: true, deep: false}) {
        pushOperation(this, {
            callBack, options
        })
        return this;
    }

    validate(expOrFn, ruleOrCallBack, formName) {
        pushOperation(this, {
            getter: expOrFn2Getter(expOrFn),
            callBack: ruleOrCB2CallBack(ruleOrCallBack),
            options: {immediate: false, deep: false, isValidation: true, formName: formName || 'noFormName'}
        })
        return this;
    }
}

export default h
