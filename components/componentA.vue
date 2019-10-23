<template>
    <div id="appChild2">
	<input  type="text" v-modle="msg"/>
	<span>{{msg}}</span>
	<button @click="getParam">get param</button>
    </div>
</template>
<script>
// import Vue from vue;
// document.querySelector("#appChild").innerHTML=`<blog-post title="i am appchild"></blog-post>`
// Vue.component('custom-input', {
// 	props: ['value'],
// 	template: `
// 	  <input
// 		v-bind:value="value"
// 		v-on:input="$emit('input', $event.target.value)"
// 	  >
// 	`
//   })
//   <custom-input v-model="searchText"></custom-input>
// new Vue({
// 	el:"#appChild2"
// })
export default{
   data () {
	    return {
			msg:"i am appchild"
		}
   },
   methods:{
	   getParam(){
		   document.querySelector("button").style.color="red";
	   }
   }
}


</script>