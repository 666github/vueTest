<template>
    <div>
        <el-container style=" border: 1px solid #eee">        
            <el-container>
              <el-header style="text-align: right; font-size: 12px">                    
                <!-- 下拉 -->
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>密码修改</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>                  
                <span>已登录</span>
              </el-header>                
              <el-main>
              	<div>
              		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		              	<div style="border: solid 1px red;border-radius: 5px 5px 0 0;">
		              		<p style="text-align: center;height: 25px;margin: 5px 0;">菜单</p>
		              		<el-tree
						      :data="datalist"
						      show-checkbox
						      node-key="id"
						      ref="tree"
						      highlight-current
						      :default-checked-keys="[1,4]"
						      :props="defaultProps">
						  	</el-tree>
						  	<el-tree
						      :data="datalist2"
							  node-key="id" 
							  show-checkbox
							  ref="tree"
							  @check-change="handleCheckChange"
						      :default-checked-keys="[72]"
						      :props="defaultProps">
						  	</el-tree>
		              	</div> 
		            </el-aside>
		            <el-header style="text-align: right; font-size: 12px;width:800px;">                    
                		<div>
                			<el-select v-model="value" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="message" placeholder="请选择2">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="forChildMsg" placeholder="请选择3">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
                		</div>
              		</el-header>
		            
              	</div>
                  <div>                
                    <!-- 复合框 -->
                    <el-input placeholder="请输入内容" v-model="fuheinput" class="input-with-select">
                      <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                      </el-select>
                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <!-- 输入建议 输入提示 -->
                    <el-row class="demo-autocomplete">
                      <!-- fetch-suggestions 是一个返回输入建议的方法属性 cb(data) 返回到 autocomplete 组件中 -->                         
                      <el-col :span="12">
                        <el-autocomplete
                          class="inline-input"
                          v-model="state1"
                          :fetch-suggestions="querySearch"
                          placeholder="激活即列出输入建议"
                          @select="handleSelect"                             
                        ></el-autocomplete>
                      </el-col>  
                      <!--trigger-on-focus 是否在输入框 focus 时显示建议列表 -->
                      <el-col :span="12">
                        <el-autocomplete
                          class="inline-input"
                          v-model="state2"
                          :fetch-suggestions="querySearch"
                          placeholder="输入后匹配输入建议"
                          :trigger-on-focus="false"
                          @select="handleSelect"                             
                        >
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                            <span class="addr">{{ item.address }}</span>
                          </template>
                      </el-autocomplete>
                      </el-col>
                    </el-row>
                    </div>
                
              </el-main>
            </el-container>
          </el-container>              

        <!-- 标签页 卡片化 -->
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane label="用户管理">用户管理的内容</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理的内容</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理的内容</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿的内容</el-tab-pane>
        </el-tabs>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页：to路由跳转对象 同vue-router的to</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/Hellomy' }">活动列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--command点击菜单项触发的事件回调 -->
            <el-dropdown-item command="111">111</el-dropdown-item>
            <el-dropdown-item command="222" disabled>222</el-dropdown-item>
            <el-dropdown-item command="333" divided>333</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;"> 左侧打开 </el-button>     
    </div>
</template>
<script>
  //tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。
  // import imgs from '../assets/panda3.jpg';
export default {
    name:'Tongzhou',
    data() {
        const item = [
        {
            date: '2016-05-02',
            name: '图幅',
            address: '上海市普陀区金沙江路 1518 弄'
        },
        {
            date: '2016-05-02',
            name: 'dfg',
            address: '上海市dfgdfsgfg 弄'
        }
        ];
        const item2={
            date2: '2888-25-22',
            name2: 'ss虎',
            address2: '来看是姐夫老家类似的加冯兰'
        };
        return {
            message:'myvue,s data2',
            visible:false,
            tableData: item,
            tableData2: Array(3).fill(item2),
            radio: '选中且禁用',
            checkAll: false,
            checkedCities: ['q', 'w'],
            checked:true,
            isIndeterminate: true,
            cities:['q','w','er','s'],
            input:'',
            textarea:'',
            fuheinput:'',
            select:'',
            restaurants: [],
            state1: '',
            state2: '',
            num:1,
            dialogVisible: false,
            // fits:[{fitImg:'fill',url:imgs,title:'fill'}]
            count: 0,
            countsImg:[],
            drawer: false,
            direction: 'ltr',
            forChildMsg:'1234567890',
            options: [{
	          value: '黄金糕',
	          label: '黄金糕'
	        }, {
	          value: '双皮奶',
	          label: '双皮奶'
	        }],
	        value:'图层',
            datalist:[{
	          id: 1,
	          label: '变化房屋'
	        }, {
	          id: 2,
	          label: '分割线'
	        }, {
	          id: 3,
	          label: '附属设施'
        	},{
	          id: 4,
	          label: '小区范围'
        	},{
	          id: 5,
	          label: '房屋数据'
        	},
            {
	          id: 6,
	          label: '边界'
        	}],
        	datalist2:[
        	{
	          id: 7,
	          label: '底图',
	          disabled:true,
	          children: [{
	            id: 71,
	            label: '影像图'
	          }, {
	            id: 72,
	            label: '电子地图'
	          }, {
	            id: 73,
	            label: '地形图'
	          }]
        	}],
        	defaultProps: {
	          children: 'children',
	          label: 'label'
	        },
	        clickid:'1'
        }
    },
    methods: {
    	handleCheckChange (data, checked, indeterminate) {//传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
		  /* 主要通过checked进行判断 */
		  if (checked) {
		  	this.clickid=data.id;//不同层级切换时，如果切换到的状态为选中，则通过一个变量先保存下它的id，与后面再度切换进行对边（查看是不是不同层级的切换）
		    let arrclick = [data.id];
		    this.$refs.tree.setCheckedKeys(arrclick);
		  }
		  if(!checked &&(data.id==this.clickid)){//如果点击是选中的本身 还是将选中赋值给自身
		  	this.$refs.tree.setCheckedKeys([data.id]);
		  }		  
		},
      changeFun (val){
        console.log(val);//lable:Radio 的 value;change事件来响应变化，它会传入一个参数value
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? ['q','w','er','s'] : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleChange(value){//计数变化时
        console.log(value);
      },
      tabClick(tab, event){
        // console.log(tab, event);
        console.log(tab._vnode.children[0].text);//tab切换时显示的文本内容
      },
      handleCommand(command) {//下拉点击事件
        console.log('click on item ' + command+'command的值');
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      loads () {         
          if (this.count<this.countsImg.length) {this.count+= 1;}
      }  
    },
    mounted() {//html加载完成后执行。执行顺序：子组件-父组件
      this.restaurants = this.loadAll();
    },
    created() {
      this.countsImg=['s','r','geag','sdfsdfds','s','r','geag','sdfsdfds','s','r','geag','sdfsdfds','s','r','geag','sdfsdfds','s','r','geag','sdfsdfds',]
    },
}

// --mode 选项参数为命令行覆写默认的模式
</script>
<style scoped>
    span{
        color: red;
    }
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>