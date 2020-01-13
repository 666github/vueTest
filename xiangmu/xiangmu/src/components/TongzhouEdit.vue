<template>
   <div>
   	 <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" >
	  <el-submenu index="1">
	    <template slot="title">视图测算</template>
	    <el-menu-item index="1-1">长度测算</el-menu-item>
	    <el-menu-item index="1-2">面积测算</el-menu-item>
	    <el-menu-item index="1-3">前一视图</el-menu-item>
	    <el-menu-item index="1-4">后一视图</el-menu-item>
	    <el-menu-item index="1-5">书签</el-menu-item>
	  </el-submenu>
	  <el-submenu index="2">
	    <template slot="title">区域查询</template>
	    <el-menu-item index="2-1">区域查询</el-menu-item>
	    <el-menu-item index="2-2">范围查询</el-menu-item>
	  </el-submenu>
	  <el-submenu index="4">
	    <template slot="title" style="height: 40px;line-height: 40px;">图层编辑</template>
	    <el-menu-item index="4-1">数据找回</el-menu-item>
	    <el-menu-item index="4-2">点选合并</el-menu-item>
	    <el-menu-item index="4-3">调整合并</el-menu-item>
	    <el-menu-item index="4-4">打断面</el-menu-item>
	    <el-menu-item index="4-5">节点编辑</el-menu-item>
	    <el-menu-item index="4-6">交换图片</el-menu-item>
	    <el-menu-item index="4-7">图层交换</el-menu-item>
	  </el-submenu>
	  <el-menu-item index="3">清除</el-menu-item>  
	</el-menu>	
   </div>
</template>
<script>
  //tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。
  // import imgs from '../assets/panda3.jpg';
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
<style scoped>
el-menu{border: solid 1px #DCDFE6;border-radius: 4px;height: 40px;line-height: 40px;}
.el-menu.el-menu--horizontal{border-bottom: none;}
.el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu{
	height: 40px;line-height: 40px;border-radius: 4px;
	border: 1px solid #DCDFE6;border-bottom-color:#DCDFE6!important;margin-top: 10px;
}

</style>