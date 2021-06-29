import Vuex from 'vuex'
import Vue from 'vue'
import h, {createModule, createVuexHero} from '../src/index'

Vue.use(Vuex)
const store = new Vuex.Store({})
createVuexHero(store)

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time || 0)
    })
}

test('init with undefined', () => {
    try {
        createModule('test1', {
            state: {
                a: h.init(undefined)
            }
        })
    } catch (e) {
        expect(!!e).toBe(true);
    }
})

test('load params', () => {
    try {
        createModule('loadParams', {
            state: {
                a: h.init('').load('callback')
            }
        })
    } catch (e) {
        expect(!!e).toBe(true);
    }
})

test('load', async () => {
    const module = createModule('testLoad', {
        state: {
            a: h.init(1).load(({state, rootState, setState}) => {
                expect(state).toEqual({a: 1})
                expect(rootState.testLoad).toEqual({a: 1})
                setState(2)
            })
        }
    })
    module.registerModule()
    await wait()
    expect(module.state.a).toBe(2)
})

test('watch params', () => {
    try {
        createModule('watchParams', {
            state: {
                a: h.init('').watch('a')
            }
        })
    } catch (e) {
        expect(!!e).toBe(true);
    }
    try {
        createModule('watchParams1-1', {
            state: {
                a: h.init('').watch([[]], 'callback')
            }
        })
        createModule('watchParams1-2', {
            state: {
                a: h.init('').watch([{}], 'callback')
            }
        })
        createModule('watchParams1-3', {
            state: {
                a: h.init('').watch([12], 'callback')
            }
        })
    } catch (e) {
        expect(!!e).toBe(true);
    }
    try {
        createModule('watchParams2', {
            state: {
                a: h.init('').watch('a', 'callback')
            }
        })
    } catch (e) {
        expect(!!e).toBe(true);
    }
})

test('watch with exp', async () => {
    return new Promise((resolve) => {
        const module = createModule('testWatch', {
            state: {
                a: h.init(1),
                b: h.init(1).watch('a', ({state, rootState, setState, value, oldVal}) => {
                    expect(state).toEqual({a: 1, b: 1,})
                    expect(rootState.testWatch).toEqual(state)
                    expect(value).toBe(1)
                    expect(oldVal).toBe(undefined)
                    setState(2)
                    expect(module.state.b).toBe(2)
                    resolve()
                }),
            }
        })
        module.registerModule()
    })
})

test('watch with getter', async () => {
    return new Promise((resolve) => {
        const module = createModule('testWatch1', {
            state: {
                a: h.init(1),
                b: h.init(1).watch((state, rootState) => {
                    expect(state.a).toBe(1)
                    expect(rootState.testWatch1).toEqual(state)
                    return state.a
                }, ({state, rootState, setState, value, oldVal}) => {
                    setState(2)
                    expect(module.state.b).toBe(2)
                    resolve()
                }),
            }
        })
        module.registerModule()
    })
})

test('watch with array', async () => {
    return new Promise((resolve) => {
        const module = createModule('testWatch2', {
            state: {
                a: 1,
                b: 2,
                c: h.init(1).watch([(s) => {
                    return s.a
                }, 'b'], ({state, rootState, setState, value, oldVal}) => {
                    expect(value).toEqual([1, 2])
                    resolve()
                }),
            }
        })
        module.registerModule()
    })
})

test('watchSelf', async () => {
    return new Promise((resolve) => {
        const module = createModule('watchSelf', {
            state: {
                a: h.init(1),
                b: h.init(1).watchSelf(({state, rootState, setState, value, oldVal}) => {
                    if (value === 1) {
                        setState(2)
                        expect(module.state.b).toBe(2)
                        resolve()
                    }
                }),
            }
        })
        module.registerModule()
    })
})

test('getter', async () => {
    const module = createModule('getter', {
        state: {
            a: h.init([1, 2, 3, 4]),
            b: h.init([]).getter((state, rootState) => {
                return state.a.map(i => i + 1)
            }),
        }
    })
    module.registerModule()
    await wait(10)
    expect(module.state.b).toEqual([2, 3, 4, 5])
})

test('validate', async () => {
    const module = createModule('validate', {
        state: {
            name: h.init('王杰'),
            nameEM: h.init('请输入姓名').validate('name', ({value, setState}) => {
                if (value.length > 5) {
                    setState('姓名长度不可大于5')
                } else {
                    setState('')
                }
            }, 'formOne'),
            age: 'age',
            ageEM: h.init('请输入年龄').validate('age', {required: true, type: 'number', message: '年龄必须为数字类型'}, 'formTwo')
        }
    })
    module.registerModule()
    await wait(10)
    await new Promise((resolve) => {
        module.validate('formOne', (result) => {
            expect(module.state.nameEM).toBe('')
            expect(result).toBe(true)
            resolve()
        })
    })
    await new Promise((resolve) => {
        module.validate('formTwo', (result) => {
            expect(module.state.ageEM).toBe('年龄必须为数字类型')
            expect(result).toBe(false)
            resolve()
        })
    })
    await new Promise((resolve) => {
        module.validate((result) => {
            expect(result).toBe(false)
            resolve()
        })
    })
    module.state.name = '王杰王杰王杰王杰王杰'
    module.state.age = 20
    await wait(10)
    expect(module.state.nameEM).toBe('姓名长度不可大于5')
    expect(module.state.ageEM).toBe('')
})

test('sub module', async () => {
    const module = createModule('subModule', {
        state: {
            a: h.init(0).watch('subModule.sub.a', ({value, setState}) => {
                setState(value + 1)
            }),
        },
        modules: {
            sub: {
                state: {
                    a: 0,
                }
            }
        }
    })
    module.registerModule()
    await wait(10)
    expect(module.state.a).toBe(1)
})

test('unwatch', async () => {
    const module = createModule('unwatch', {
        state: {
            a: 0,
            b: h.init(0).watch('a', ({value, setState, unwatch}) => {
                setState(value + 1)
                unwatch()
            }),
        },
    })
    module.registerModule()
    await wait(10)
    module.state.a = 10
    await wait(10)
    expect(module.state.b).toBe(1)
})


test('unregisterModule', async () => {
    const module = createModule('unregisterModule', {
        state: {
            a: 0,
        },
    })
    module.registerModule(true)
    await wait(10)
    module.state.a = 10
    expect(module.state.a).toBe(10)
    module.unregisterModule()
    await wait(10)
    expect(module.state.a).toBe(0)
})
