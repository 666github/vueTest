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
    
    




  },
}

</script>