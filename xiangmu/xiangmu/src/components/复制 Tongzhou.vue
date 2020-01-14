<template>
    <div>
        <el-container style=" border: 1px solid #eee">        
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
			  <el-container>
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
			    	<el-main style="padding-top: 0;">   
			    		<el-row :gutter="20">
						  <el-col :span="8">
						  	<div class="grid-content bg-purple">
						  	
						  	<el-select v-model="value" placeholder="图层选择" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="valueJie" placeholder="街乡镇" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="valueCun" placeholder="村社区" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						  </div></el-col>
						  <el-col :span="6"><div class="grid-content bg-purple">
						  	<el-select v-model="value1" placeholder="图层选择" style="width: 150px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-input v-model="input" placeholder="请输入id" prefix-icon="el-icon-search" style="width: 100px;"></el-input>
						  </div></el-col>
						  <el-col :span="10"><div class="grid-content bg-purple"><TongzhouEdit style="float: right;"/></div></el-col>
						</el-row>
		            <!--<el-header style="text-align: right; font-size: 12px;background-color:#FFFFFF;padding: 0;">                    
                		<div style="float: left;">
                			<el-select v-model="value" placeholder="图层选择" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="valueJie" placeholder="街乡镇" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-select v-model="valueCun" placeholder="村社区" style="width: 100px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
                		</div>
                		<div style="float: left;margin-left: 50px;">
                			<el-select v-model="value1" placeholder="图层选择" style="width: 150px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
						    <el-input v-model="input" placeholder="请输入id" prefix-icon="el-icon-search" style="width: 100px;"></el-input>
                		</div>
                		<TongzhouEdit style="float: right;"/>
               		</el-header>		                                             -->
              </el-main>
			  </el-container>
         </el-container>              
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;"> 左侧打开 </el-button>     
    </div>
</template>
<script>
  //tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。
 import TongzhouEdit from './TongzhouEdit.vue';
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
	        valueJie:'街乡镇',
	        valueCun:'村社区',
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
        	value1:'图层选择',
        	valueId:'请输入id',
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
    components:{//挂子
       TongzhouEdit
  }
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