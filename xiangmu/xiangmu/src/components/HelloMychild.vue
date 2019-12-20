<template>
        <div class="child">
                <div>
                  <span>子组件数据</span>
                  <input v-model="forChildMsg"/>
                </div>
                <p>{{forChildMsg}}</p>
                <p>ownChildMsg : {{ownChildMsg}}</p>
              </div>
</template>
<script >
  // 使用变量存储 prop 的初始值，并用 watch 来观察 prop 值得变化 发生变化时，更新变量的值
export default {
  name:'Hellomychild',
  props: {
    "for-child-msg": String
  },
  data() {
    return {
      ownChildMsg: this.forChildMsg
    };
  },
  watch: {//路由跳转user/2 user/1 keep-alive组件复用 用watch监听变化
    forChildMsg() {
      this.ownChildMsg = this.forChildMsg;
    }
  },
  created() {//es6
  // 数组的扩展
    let arr=[3,5,7];
    let arr2=Array.from(arr,(x)=>x*5);//新数组
    console.log(arr2);
    for (const item of arr) {//for of 遍历数组元素
      console.log(item);
    }
    for (const elem of arr2.values()) {
      console.log(elem);//键值
    }
    //Array.prototype.flat()拉平数组

  // 对象的扩展 for in 遍历对象
    var myObject={
  　　a:1,
  　　b:2,
  　　c:3
    }
    console.log(Object.keys(myObject));
    for (var key in myObject) {
      console.log(key);//a b c
    }
    const proto = {
      foo: 'hello'
    }; 
    const proto2 = {
      foo: 'hello'
    };     
    const obj = {// super指向当前对象的原形对象
      foo: 'world',
      find() {
        return super.foo;
      }
    };
    Object.setPrototypeOf(obj, proto);//设置对象obj的原型对象
    console.log(obj.find())  // "hello"
    // 对象扩展运算符
    let aobj={a:3,b:4};
    let n={...aobj,c:8,d:'n有值'};
    console.log(n);
    //es2020链判断运算符 n?.d  n == null ? undefined : n.d
    //es2020运算符左侧的值为null或undefined时，才会返回右侧的值。?? 双引号
    // 对象新增方法
    console.log("两个对象是否严格相等："+Object.is(proto,obj),Object.is(1,2),Object.is(NaN,NaN),Object.is(proto,proto2));//false,true,true,false 是否完全相等
    console.log(Object.assign(proto,myObject));//对象合并 浅拷贝 遇到同名属性是“替换”不是“添加”，如果处理的是数组会被当作为对象
  
  // symbol原始数据，表示独一无二的值 第七种数据类型，undefined、null、Boolean、String、Number、Object
    // symbol值作为对象属性名时，不能用点运算符 a[Symbol()] = 'Hello!';
    //消除魔术字符串 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值
    
  // set map数据结构 set方法:add delete has clear
    const set =new Set([1,2,3,8,8]);//set成员的值都是唯一
    arr.forEach(item=>set.add(item));
    console.log([...set]);//数组去重 1 2 3 8 5 7 去重方法二：Array.from(set);
    let aba=[...new Set('ababbc')].join('');//字符串去重
    // set遍历方法：keys() values() entries() forEach() 由于Set结构没有键名，所以keys和values值一样 
    // for of，forEach直接遍历
    let objAba=arr.map(x=>x*10);
    console.log(objAba)
    console.log(set)
    // map 键值对”的数据结构，Map 比 Object 更合适
    // map.set map.get
    const map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
    const map2 = new Map(
      [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
    console.log(map2);//{2 => "_a", 4 => "_b", 6 => "_c"}
    
    // prox拦截
    var handler = {
      get: function(target, name) {//拦截对象属性的读取 可接受三个参数：目标对象、属性名、proxy实例
        if (name === 'prototype') {
          return Object.prototype;
        }
        return 'Hello, ' + name;
      },
      apply: function(target, thisBinding, args) {//拦截 Proxy 实例作为函数调用的操作
        return args[0];
      },
      construct: function(target, args) {//拦截 Proxy 实例作为构造函数调用的操作
        return {value: args[1]};
      }
    };
    var fproxy = new Proxy(function(x, y) {
      return x + y;
    }, handler);
    console.log(fproxy(1, 2),new fproxy(1, 2),fproxy.prototype);
    // 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理

  // promise异步编程的一种解决方案 容器保存着未来才会结束的事件的结果
    // then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行
    // 如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
    // 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。建议总是使用catch方法，而不使用then方法的第二个参数。
    // Promise 内部的错误不会影响到 Promise 外部的代码
    // 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。
      // 第一种写法是用async函数来写。
     /* const f = () => console.log('now');
      (async () => f())().then().catch();
      console.log('next');
      // 第二种写法是使用new Promise()。*/
      const ff = () => console.log('now');
      (() => new Promise(
          resolve => resolve(ff())
        ) )();
      console.log('next');
      // 鉴于这是一个很常见的需求，所以现在有一个提案，提供Promise.try方法替代上面的写法。
      // const f = () => console.log('now');
      // Promise.try(f);
      // console.log('next');
    //事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。
      // Promise.try(() => database.users.get({id: userId})).then().catch();
  
  // Iterator遍历器
      // 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
      // NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];或者NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
      // 调用 Iterator 接口的场合：解构赋值;扩展运算符;yield*;for...of,Array.from(),Map(), Set(), WeakMap(), WeakSet(),Promise.all(),Promise.race(),字符串的 Iterator 接口,字符串是一个类似数组的对象
      // for in 读取键名， for of读取键值。
      // 数组内置的forEach循环，无法中途跳出循环；for in为遍历对象而设计，不适用于遍历数组。for of可以与break、continue和return配合使用
      // 当用for of遍历对象时需要将对象的简明生成一个数组，然后遍历这个数组：
      for (var key of Object.keys(obj));
      //    或者使用Generator函数将对象重新包装一下
      function* entries(obj) { for (let key of Object.keys(obj)) { yield [key, obj[key]];} }
      for (let [key, value] of entries(obj)) {console.log(key, '->', value);}

  // Generator异步编程解决方案 
    // Generator 函数是一个状态机，封装了多个内部状态。function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
    // yield表达式如果用在另一个表达式之中，必须放在圆括号里面：console.log('Hello' + (yield 123));
    function* foo(x) {
      var y = 2 * (yield (x + 1));
      var z = yield (y / 3);
      return (x + y + z);
    }
    var a = foo(5);
    a.next() ;//x：5 返回x+1是6  由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
    a.next(12); //上一表达式是12，y=2*12=24,返回y/3即24/3=8;
    a.next(13) ;//上一表达式是13，z=13,return返回5+24+13=42
    // for...of 循环 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象
    function* objectEntries(obj) { //加上遍历器接口
      let propKeys = Reflect.ownKeys(obj);
      for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
      }
    }
    let jane = { first: 'Jane', last: 'Doe' };
    for (let [key, value] of objectEntries(jane)) {
      console.log(`${key}: ${value}`);
    }
    // 另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面
    function* objectEntries2() {
      let propKeys = Object.keys(this);
      for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
      }
    }
    let jane2 = { first: 'Jane', last: 'Doe' };
    jane2[Symbol.iterator] = objectEntries2;
    for (let [key, value] of jane2) {
      console.log(`${key}: ${value}`);
    }
    // throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
    // Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象
    function* g() {
      yield 1;
      console.log('throwing an exception');
      throw new Error('generator broke!');
      yield 2;
      yield 3;
    }
    function log(generator) {
      var v;
      console.log('starting generator');
      try {
        v = generator.next();
        console.log('第一次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      try {
        v = generator.next();//'throwing an exception'
        console.log('第二次运行next方法', v);
      } catch (err) {//generator broke!
        console.log('捕捉错误', v);
      }
      try {
        v = generator.next();
        console.log('第三次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      console.log('caller done');
    }
    log(g());//然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。
  // Generator 函数返回的遍历器对象return方法，返回给定的值，并且终结遍历 Generator函数,如果return方法调用时，不提供参数，则返回值的value属性为undefined。
    // g.return('foo') // { value: "foo", done: true }
    function* numbers () {
      yield 1;
      try {
        yield 2;
        yield 3;
      } finally {//如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。
        yield 4;
        yield 5;
      }
      yield 6;
    }
    var g = numbers();
    g.next() // { value: 1, done: false }
    g.next() // { value: 2, done: false }
    g.return(7) // { value: 4, done: false }
    g.next() // { value: 5, done: false }
    g.next() // { value: 7, done: true }然后等到finally代码块执行完，再返回return()方法指定的返回值
    // throw()是将yield表达式替换成一个throw语句。return()是将yield表达式替换成一个return语句。
  // 如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
      function* foo() {
      yield 2;
        yield 3;
        return "foo";//如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
      }
      function* bar() {
        yield 1;
        var v = yield* foo();
        console.log("v: " + v);
        yield 4;
      }
      var it = bar();
      it.next()
      // {value: 1, done: false}
      it.next()
      // {value: 2, done: false}
      it.next()
      // {value: 3, done: false}
      it.next();
      // "v: foo"
      // {value: 4, done: false}
      it.next()
      // {value: undefined, done: true}
      // 上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。
      function* genFuncWithReturn() {
        yield 'a';
        yield 'b';
        return 'The result';
      }
      function* logReturned(genObj) {
        let result = yield* genObj;
        console.log(result);
      } 
      // 第一次是扩展运算符遍历函数logReturned返回的遍历器对象
      // 第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象
      // 最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象:[a,b];return语句的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出
      console.log([...logReturned(genFuncWithReturn())]);//The result,[a,b];
    // 让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this,例
        function* Fthis() {
          this.a = 1;
          yield this.b = 2;
          yield this.c = 3;
        }
        var objthis = {};
        var fthis = Fthis.call(obj);//使用call方法绑定 Generator 函数内部的this
        fthis.next();  // Object {value: 2, done: false}
        fthis.next();  // Object {value: 3, done: false}
        fthis.next();  // Object {value: undefined, done: true}
        objthis.a // 1 //构造函数调用以后，这个空对象就是 Generator 函数的实例对象了
        objthis.b // 2
        objthis.c // 3
        // 下面将fthis和objthis统一  objthis换成Fthis.prototype
        // function* Fthis() {
        //   this.a = 1;
        //   yield this.b = 2;
        //   yield this.c = 3;
        // }
        // var fthis = Fthis.call(Fthis.prototype);
        // fthis.next();  // Object {value: 2, done: false}
        // fthis.next();  // Object {value: 3, done: false}
        // fthis.next();  // Object {value: undefined, done: true}
        // fthis.a // 1
        // fthis.b // 2
        // fthis.c // 3
        // 再将F改成构造函数，就可以对它执行new命令了。
        // function* gen() {
        //   this.a = 1;
        //   yield this.b = 2;
        //   yield this.c = 3;
        // }
        // function F() {
        //   return gen.call(gen.prototype);
        // }
        // var f = new F();
        // f.next();  // Object {value: 2, done: false}
        // f.next();  // Object {value: 3, done: false}
        // f.next();  // Object {value: undefined, done: true}
        // f.a // 1
        // f.b // 2
        // f.c // 3
        // 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。在任意对象上部署next方法
        function* iterEntries(obj) {
          let keys = Object.keys(obj);
          for (let i=0; i < keys.length; i++) {
            let key = keys[i];
            yield [key, obj[key]];
          }
        }
        let myObj = { foo: 3, bar: 7 };
        for (let [key, value] of iterEntries(myObj)) {
          console.log(key, value);
        }


    /*    

执行这段代码的方法如下。

var g = gen();
var result = g.next();
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

Thunk 函数
Thunk 函数是自动执行 Generator 函数的一种方法。

参数的求值策略
Thunk 函数早在上个世纪 60 年代就诞生了。

那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。

var x = 1;

function f(m) {
  return m * 2;
}

f(x + 5)
上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？

一种意见是"传值调用"（call by value），即在进入函数体之前，就计算x + 5的值（等于 6），再将这个值传入函数f。C 语言就采用这种策略。

f(x + 5)
// 传值调用时，等同于
f(6)
另一种意见是“传名调用”（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。

f(x + 5)
// 传名调用时，等同于
(x + 5) * 2
传值调用和传名调用，哪一种比较好？

回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

function f(a, b){
  return b;
}

f(3 * x * x - 2 * x - 1, x);
上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。对这个参数求值，实际上是不必要的。因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。

Thunk 函数的含义
编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
上面代码中，函数 f 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。

这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。

JavaScript 语言的 Thunk 函数
JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
使用上面的转换器，生成fs.readFile的 Thunk 函数。

var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
下面是另一个完整的例子。

function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);

ft(1)(console.log) // 1
Thunkify 模块
生产环境的转换器，建议使用 Thunkify 模块。

首先是安装。

$ npm install thunkify
使用方式如下。

var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
Thunkify 的源码与上一节那个简单的转换器非常像。

function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。这样的设计与下文的 Generator 函数相关。请看下面的例子。

function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。

    */ 
    
  },
}

</script>