# vuex-hero
让vuex更简单，数据操作更集中。
- 致力于解决对数据的操作逻辑分散在各个方法中，甚至各个文件中。
- 致力于解决某一数据的修改，导致关联数据变动带来的业务复杂度。

## 使用方法

```shell script
npm i vuex-hero
```
## Demo

```js
// 第一步：设置rootStore
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {createVuexHero} from 'vuex-hero';
const store = new Vuex.Store({})
createVuexHero(store)


<template>
  <div>
    <el-input v-model="state.name"/>
    <el-select
      v-model="state.month"
      placeholder="请选择月份"
    >
      <el-option
        v-for="(item) in state.monthRange"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <el-select v-model="state.day" placeholder="请选择日期">
      <el-option
        v-for="(item) in state.dayRange"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <el-button
      @click="submit"
    />
  </div>
</template>

<script>
import h, {createModule} from 'vuex-hero'

function getRange(max) {
  let arr = []
  for (let i = 0; i < max; i++) {
    arr.push(i + 1)
  }
  return arr;
}

// 第二步：设置创建模块
const module = createModule('test', {
  state: {
    monthRange: h.init([]).load((alley) => {
      const {setState, state, rootState} = alley;
      setState(getRange(12))
      // 也可以通过state直接赋值，但是month的业务逻辑不应当在此函数内处理，此函数最好只处理有关monthRange的业务逻辑。在某些场景下直接为state赋值可能十分有用。
      // state.monthRange = getRange(12)
      // state.month = state.monthRange[0]
    }),
    month: h.init(null).watch('monthRange', ({value, oldVal, setState, state, rootState}) => {
      // 默认选择数据范围的第一个
      setState(value[0])
    }),
    dayRange: h.init([]).watch('month', ({value, setState}) => {
      const month = value;
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        setState(getRange(31))
      } else if (month === 2) {
        setState(getRange(28))
      } else {
        setState(getRange(30))
      }
    }),
    day: h.init(null).watch('dayRange', ({value, setState, state}) => {
      const day = state.day;
      const monthRange = value;
      if (day) {
        if (monthRange.length) {
          if (day > monthRange[monthRange.length - 1]) {
            setState(null)
          }
        }
      }
    }),
    name: h.init('').watchSelf(({value, setState}) => {
      if (value.length > 10) {
        setState(value.substring(0, 10))
      }
    })
  }
})

// function方法可以访问this.state this.store
module.submit = function (prefix) {
  console.log(`${prefix}${this.state.name},我的生日是${this.state.month}月${this.state.day}日`)
}

export default {
  props: {},
  data: function () {
    // 第四步：将module.state作为当前UI组件的data.state
    return {
      state: module.state,
    }
  },
  beforeCreate() {
    // 第三步：动态注册module
    module.registerModule(true)
  },
  methods: {
    submit() {
      // 调用module方法
      module.submit('我的名字是')
    }
  },
  computed: {}
}
</script>
```

# API
## createVuexHero(store)
设置根Store，无返回值
- `store`根store

## h
为state添加监听方法，设置初始化值。

#### h实例方法
###### `watch(expOrFn, callBack, options = {immediate: true, deep: false})`
- 核心api，本质是调用 [Vuex.Store.watch](https://vuex.vuejs.org/zh/api/#watch) 方法。
- `expOrFn`需要监听的state，可以是字符串或者回调方法，参考下面例子。
- `callback`回调函数，参数为：`{value,oldVal,setState,state,rootState,unwatch}` 对象
- `options`可选，请参考 [Vuex.Store.watch](https://vuex.vuejs.org/zh/api/#watch) 
```js
const module = createModule('test', {
  state: {
    // 初始化值是个空字符串
    info: h.init(''),
    length: h.init(0).watch('info',({value,setState}) =>{
        // 监听info变量，所以此处 value 就是 info
        setState(`当前统计文字共计${value.length}个`)
    },{immediate: true, deep: false}),
    length1: h.init(0).watch('test.info',({value,setState}) =>{
        // 监听info变量，所以此处 value 就是 info
        setState(`当前统计文字共计${value.length}个`)
    }),
    length2: h.init(0).watch((state,rootState) =>{return state.info},({value,setState}) =>{
        // 所以此处 value 是 expOfFn 的返回值
        setState(`当前统计文字共计${value.length}个`)
    }),
  }
})
```
###### `watchSelf(callBack, options = {immediate: true, deep: false})`
- `watchSelf`监听当前state值。
- `options`可选，请参考 [Vuex.Store.watch](https://vuex.vuejs.org/zh/api/#watch) 

```js
const module = createModule('test', {
  state: {
    info: h.init('').watchSelf(({value,setState}) => {
        // watchSelf中调用setState一定要有判断逻辑，否则会死循环。
        // 限制info最大长度
        if(value.lenght > 200) setState(value.substring(0,200));
    })
  }
})
```

###### `getter(getter, options = {immediate: true, deep: false})`
- 用于计算属性，本质是将`watch`方法中`expOrFn`的返回值直接赋值给当前state
- `options`可选，请参考 [Vuex.Store.watch](https://vuex.vuejs.org/zh/api/#watch) 

```js
const module = createModule('test', {
  state: {
    name:'',
    age:12,
    introduction:h.init('').getter((state,rootState) =>{
        return `我的名字是${state.name}，我今年${state.age}岁了`
    })
  }
})
```
###### `load(callBack)`
- 用于异步初始化state

```js
const module = createModule('test', {
  state: {
    name:h.init('').load(({setState, state, rootState}) =>{
        setTimeout(() => {setState('张三')},1000)
    }),
  }
})
```
###### `validate(expOrFn, ruleOrCallBack, formName = 'noFormName')`
- 创建表单验证错误提示信息
- `expOrFn` 参考上方 `watch` 方法
- `ruleOrCallBack` 可以是对象或者回调函数，如果是对象请参考 [async-volidator](https://github.com/yiminghe/async-validator)， 如果是回调函数参考上方 `watch` 方法
- `formName` 可选，字符串用以区分不同表单。
- 具体使用参考下方 `Module.validate`

#### h静态方法
###### `init(initValue)` 
-  静态方法，返回`h`实例对象，以同步的方式为state指定初始化值
- `initValue`不能是`undefined`
 
###### `strLoad(callBack)`
- 等于`h.init('').load(callBack)`
###### `arrLoad(callBack)`
- 等于`h.init([]).load(callBack)`
###### `strGetter(getter, options = {immediate: true, deep: false})`
- 等于`h.init('').getter(getter, options = {immediate: true, deep: false})`
###### `arrGetter(getter, options = {immediate: true, deep: false})`
- 等于`h.init([]).getter(getter, options = {immediate: true, deep: false})`
###### `strWatch(expOrFn, callBack, options = {immediate: true, deep: false})`
- 等于`h.init('').watch(expOrFn, callBack, options = {immediate: true, deep: false})`
###### `arrWatch(expOrFn, callBack, options = {immediate: true, deep: false})`
- 等于`h.init([]).watch(expOrFn, callBack, options = {immediate: true, deep: false})`
###### `strWatchSelf(callBack, options = {immediate: true, deep: false})`
- 等于`h.init('').watchSelf(callBack, options = {immediate: true, deep: false})`
###### `arrWatchSelf(callBack, options = {immediate: true, deep: false})`
- 等于`h.init([]).watchSelf(callBack, options = {immediate: true, deep: false})`
###### `strValidate(expOrFn, ruleOrCallBack, formName)`
- 等于`h.init('').validate(expOrFn, ruleOrCallBack, formName)`

## createModule(path:string | Array<string>, module:{state:object,mutations?,actions?,getters?,modules?})
创建模块，返回Module实例对象。
- `path` ：创建模块的路径 `eg:a.b.c 或者 ['a','b','c']`
- `module` ：创建模块配置，参考vuex
 
## Module

#### Module实例方法
###### `registerModule(replace)`
- 动态注册Module，本质是是调用了Vuex.Store.registerModule
- `replace`是否替换已经存在的module，这在重新初始化state非常有用
###### `unregisterModule`
- 卸载Module
###### `validate(fromName)`
- 表单验证方法

```js
const module = createModule('test', {
  state: {
    name: '',
    // validate第二个参数可以是对象或者是回调函数，如果是对象请参考[async-volidator](https://github.com/yiminghe/async-validator)
    nameErrorMessage:h.init('').validate('name',{require:true,type:'string',message:'姓名不能为空'},'formName'),
    age: 12,
    ageErrorMessage:h.init('').validate('age',({value,setState})=>{
        //setState 一定要调用
        if(value < 18) {
            setState('未满18岁！')        
        }else {
            setState('')
        }
    },'formAge')
  }
})

module.registerModule(true)
// 验证当前模块全部表单
module.validate((resulet) => {console.log("所有表单校验结果：",result)})
// 验证当前模块名字为'formAge'的表单
module.validate('formAge',(resulet) => {console.log("年龄校验结果：",result)})
```

#### Module实例属性
###### `store`
- 可以获取通过`createVuexHero(store)`设置的store

###### `state`
- 本模块配置的`state`
###### `子模块`
- 本模块配置的`subModule`

```js
const module = createModule('test', {
  state: {
    name: '',
  },
  modules:{
    mySubModule:{
        state:{
            age:12
        },      
    }
  },
})
// 可以通过`module.mySubModule`访问对应的子模块


