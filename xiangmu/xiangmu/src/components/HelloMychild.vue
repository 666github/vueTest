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
    // async函数
      // 并发发出远程请求：
        async function logInOrder(urls) {
          // 并发读取远程URL
          const textPromises = urls.map(async url => {
            const response = await fetch(url);
            return response.text();
          });
          // 按次序输出
          for (const textPromise of textPromises) {
            console.log(await textPromise);
          }
        }

  // 类
        // ES5 的构造函数，对应 ES6 的类的构造方法constructor.
        // 类的所有方法都定义在类的prototype属性上面,在类的实例上面调用方法，其实就是调用原型上的方法。
        // Object.assign方法向类添加多个方法:Object.assign(Point.prototype, {toString(){},toValue(){} });
        // prototype对象的constructor属性，直接指向“类”的本身
        // 与 ES5 一样，类的所有实例共享一个原型对象，使用 Object.getPrototypeOf 方法来获取实例对象的原型。__proto__属性改写原型，必须相当谨慎
        // 在“类”的内部使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为；存值函数和取值函数是设置在属性的 Descriptor 对象上的。
        // class可以写成表达式的形式，类名（name)只能在class内部引用.
        class Foo {
          constructor(...args) {
            this.args = args;
          }
          * [Symbol.iterator]() {//Generator 函数
            for (let arg of this.args) {
              yield arg;
            }
          }
        }
        for (let x of new Foo('hello', 'world')) {
          console.log(x);// hello // world
        }
        //this指向 类的方法内部如果含有this，它默认指向类的实例
          class Objthis {
            constructor() {//this指向
              this.getThis = () => this;
            }
          }
          const myObjthis = new Objthis();
          console.log(myObjthis.getThis() === myObjthis); // true
        //方法前加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用.Foo.classMethod() // 'hello'; foo.classMethod() //TypeError
        //如果静态方法包含this关键字，这个this指的是类，而不是实例。
        // 静态方法也是可以从super对象上调用的
        class FooSuper {
          static classMethod() {
            return 'hello';
          }
        }
        class BarSuper extends FooSuper {
          static classMethod() {
            return super.classMethod() + ', too';
          }
        }
        BarSuper.classMethod(); // "hello, too"

    /*

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
class foo {
  bar = 'hello';
  baz = 'world';
  constructor(){
    // ...
  }
}
上面的代码，一眼就能看出，foo类有两个实例属性，一目了然。另外，写起来也比较简洁。

静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

class Foo {
}

Foo.prop = 1;
Foo.prop // 1
上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。

class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
这个新写法大大方便了静态属性的表达。

// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

私有方法和私有属性
现有的解决方案
私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。

const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
上面代码中，Symbol 值的属性名依然可以从类的外部拿到。

私有属性的提案
目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。

class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
上面代码在类的外部，读取私有属性，就会报错。

下面是另一个例子。

class Point {
  #x;

  constructor(x = 0) {
    this.#x = +x;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = +value;
  }
}
上面代码中，#x就是私有属性，在Point类之外是读取不到这个属性的。由于井号#是属性名的一部分，使用时必须带有#一起使用，所以#x和x是两个不同的属性。

之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。

这种写法不仅可以写私有属性，还可以用来写私有方法。

class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return #a + #b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
上面代码中，#sum()就是一个私有方法。

另外，私有属性也可以设置 getter 和 setter 方法。

class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()来完成。

私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。

class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
上面代码允许从实例foo上面引用私有属性。

私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。

class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。

new.target 属性
new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
上面代码确保构造函数只能通过new命令调用。

Class 内部调用new.target，返回当前 Class。

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
需要注意的是，子类继承父类时，new.target会返回子类。

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
上面代码中，new.target会返回子类。

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
上面代码中，Shape类不能被实例化，只能用于继承。

注意，在函数外部，使用new.target会报错。





    */ 
    
  },
}

</script>