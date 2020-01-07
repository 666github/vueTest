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
    // 子类继承父类时，new.target会返回子类
      //类的继承
      // 在子类的构造函数中，只有调用super之后，才可以使用this关键字
      // super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，
      // 因此super()在这里相当于A.prototype.constructor.call(this)。
      // super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类，
      // 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的，
      // 如果属性定义在父类的原型对象上，super就可以取到。
    // 类的应用
        // 子类的__proto__属性，表示构造函数的继承，总是指向父类。作为一个对象，B.__proto__ = A;
        // 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。作为一个构造函数,B.prototype.__proto__ = A.prototype;
        // 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为

    // Module的语法
        // export使用大括号指定所要输出的一组变量 export { firstName, lastName, year };可以使用as关键字重命名。
        // 第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号
          // 第一组
            // export default function crc32() { // 输出
            //   // ...
            // }
            // import crc32 from 'crc32'; // 输入

            // // 第二组
            // export function crc32() { // 输出
            //   // ...
            // };
            // import {crc32} from 'crc32'; // 输入
        // export { each as forEach };暴露出forEach接口，默认指向each接口
    
    // Module的加载实现
        // 两种脚本异步加载的方式：defer先渲染后执行；async下载完就执行
//            <script src="path/to/myModule.js" defer>	defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行
//            <script src="path/to/myModule.js" async> async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
//           浏览器加载 ES6 模块 type="module"属性，是异步加载，等同于打开了script标签的defer


    /*







    */ 
    
  },
}

</script>