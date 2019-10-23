// import _ from 'lodash';
import Vue from 'vue/dist/vue.esm.js';
// import ComponentA from "./components/componentA";
// function component(){
	// var element = document.createElement('div');
	// element.id="app";
	// element.innerHTML=_.join(['通州','房屋管理平台'],' ');	
	// return element;
// }
// document.body.appendChild(element);
// document.querySelector('#app').innerHTML=`<div id="appChild">app</div>`;
// Vue.component('button-counter',{
// 	data:function (){
// 		return {
// 			count:0
// 		}
// 	},
// 	template:`<button @click="count++">clicked me {{count}} times</button>`
// })
// var vm= new Vue({
// 	el: '#app',
// 	data: {
// 	  message: 'Hello Vue!'
// 	}
// })
// export default {
// 	components: {
// 		ComponentA
// 	}	
// }
//post in posts
//使用时间抛出一个值 通过$event访问到被抛出的这个值
// document.querySelector("#app").innerHTML=`<blog-p v-for="post in posts" :key="post.id" :post="post" :name="post.name" v-on:enlarge-text="onEnlargeText" :style="{fontSize:postFontSize + 'em'}"></blog-p>`;
Vue.component('blog-p',{//子组件接收post
	props:['post'],
	template:`<div class="blog-p" ><span>{{post.name}} {{post.id}}</span><button v-on:click="$emit('enlarge-text', 0.1)">blog-p</button><div v-html="post.content"></div></div>`
});
Vue.component('blog-pparent',{//父组件自定义post
	data(){
		return{
			posts:[
				{id:1,myparent:"pparent one"},
				{id:2,myparent:"pparent two"}
			],
			postFontSize:5
		}
	},
	methods:{
		onEnlargeText:function(enlargeAmount){
			this.postFontSize+=enlargeAmount
		}
	},
	template:`
	<div>
		<span>pparent</span>
		<blog-p v-for="post in posts" :key="post.id" :post="post" :myparent="post.myparent" v-on:enlarge-text="onEnlargeText" :style="{fontSize:postFontSize + 'em'}" />					
	</div>
	`
})
//全局组件
Vue.component('Parent',{
	data(){
		return{
			fjzj:"fuji自定义"
		}
	},
	template:`
		<div>
			<button>父级</button>
			<Child :childVal="fjzj"/>					
		</div>
	`
})
Vue.component('Child',{
	props:["childVal"],//子组件接收父组件定义的属性
	template:`
		<div>
		<input type="text" v-model="childVal"><span>{{childVal}}</span>
		<button>子级</button>
		</div>
	`
})
var ComponentA={//局部组件
	data () {
	    return {
			msg:"i am appchild"
		}
   },
   template:`
	   <div>
	   	<input type="text" class="vmodle" v-model="msg" @input="getParam" >
		   <span>{{msg}}</span>
		<div id="appChild">
			<Parent/>
			<blog-pparent/>
		</div>
	   </div>
   `,
   methods:{
	   getParam(){
		   document.querySelector("span").style.color="red";
	   }
   }
}

new Vue({
	el:"#app",
	data:{
		posts:[
			{id:1,name:"forone name"},
			{id:2,name:"fortwo name"}
		],
		postFontSize:1
	},
	methods:{
		onEnlargeText:function(enlargeAmount){
			this.postFontSize+=enlargeAmount
		}
	},
	components:{
		ComponentA
	},
	template:`
		<div>
			<ComponentA/>
			<blog-p v-for="post in posts" :key="post.id" :post="post" :name="post.name" v-on:enlarge-text="onEnlargeText" :style="{fontSize:postFontSize + 'em'}"></blog-p>
		</div>	
	`
})
//单项数据流：1这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。2这个 prop 以一种原始的值传入且需要进行转换。
//禁用特性继承:组件中设置inheritAttrs:false 不影响style和class的绑定
//template 最外层一定要包裹起来
//组件 通过props传值
	//先给父亲组件中绑定自定义属性，在子组件中使用props接收父组件传递的数据