
import Vue from './vue.js'
import * as obj from './App.js';
console.log(obj.num1,obj.num2,obj.add(3,5));
new Vue({
    el:'#app',
    components:{
        App:obj.default
    },
    template:`<App/>`
})