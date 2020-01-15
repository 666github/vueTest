<template>
    <div>
        <el-container style=" border: 1px solid #eee">                                 
		        <el-aside v-show="drawer">
		      		<el-drawer
				        title="查询结果"
				        :direction="direction"
				        :visible.sync="drawer"
				        :modal="false"
				        size=300px
				        :wrapperClosable="false">
				        <span>暂无内容</span>
		        	</el-drawer>
		        </el-aside>
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
			   		<el-main class="mapContent" id="map">
		              	<el-container>
						    <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
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
								  <el-col :span="8"><div class="grid-content bg-purple">						  	
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
		              		</el-main>
					    </el-container>
					    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;"> 左侧打开 </el-button> 
		            </el-main>
			        <el-footer>Footer</el-footer>
			</el-container>             			  		  
        </el-container>   
    </div>
</template>
<script>
  //tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。
import esriLoader from 'esri-loader';
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
      var tzdz_url="http://tzfw.natapp1.cc/arcgis/rest/services/TZDZDT/MapServer";//电子地图
	 var tzyx_url="http://tzfw.natapp1.cc/arcgis/rest/services/ImageTZ/MapServer";//影像服务	
	var map;
	const options = {
  	url: 'http://localhost/arcgis_js_v327_api/arcgis_js_api/library/3.27/3.27compact/init.js' // 这里的API地址可以是官网提供的CDN，也可在此配置离线部署的地址
	}
	esriLoader.loadModules([
		"esri/map",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/undoManager",
		"esri/tasks/GeometryService",
		"esri/layers/GraphicsLayer","esri/geometry/Extent",
		"esri/toolbars/draw",
		"esri/toolbars/edit",
		"esri/toolbars/navigation",
		"esri/dijit/editing/Cut",
		"esri/dijit/editing/Union",
		"esri/graphic",
		"esri/geometry/geometryEngine",
		"esri/config",
		"esri/InfoTemplate",
		"esri/layers/FeatureLayer",
		"esri/tasks/query",
		"esri/Color",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleFillSymbol",
		"esri/dijit/editing/TemplatePicker",
		"esri/renderers/SimpleRenderer",
		"dojo/_base/connect",
		"dojo/_base/array",
		"dojo/_base/event",
		"dojo/_base/lang",
		"dojo/parser",
		"dijit/registry",
		"dijit/layout/BorderContainer", "dijit/layout/ContentPane",
		"dijit/form/Button", "dojo/domReady!"], options) // 传入需要使用的类
	.then(([Map,ArcGISDynamicMapServiceLayer, UndoManager, GeometryService,GraphicsLayer,Extent, Draw, Edit,Navigation, Cut, Union, Graphic, geometryEngine, esriConfig,InfoTemplate,
		FeatureLayer, Query, Color,SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,TemplatePicker,SimpleRenderer, connect,arrayUtils, event, lang, parser, registry]) => {
	  		map = new Map("map", {			
//			basemap: tzyx_url,
			//去掉esri图标和缩放图标
			logo:false,
			slider:false,
			//        center: [-83.244, 42.581],
			zoom: 2
		});
		var Imagelayer = new esri.layers.ArcGISTiledMapServiceLayer(tzyx_url);//影像
		var Dzdtlayer = new esri.layers.ArcGISTiledMapServiceLayer(tzdz_url);//电子
			var featureLayerXzbj=new FeatureLayer( "http://tzfw.natapp1.cc/arcgis/rest/services/TZXZBJ/MapServer/0", {
   			mode: FeatureLayer.MODE_SNAPSHOT,
		    outFields: ["*"]
		});
		var defaultSymbolXzbj =  new SimpleFillSymbol(
		    SimpleFillSymbol.STYLE_NULL,  // 面样式，不填充。
		    // new SimpleLineSymbol(style, color, width)
		    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([197,97,20]), 3),
		    new Color([197,97,20,1])  // 填充颜色。
		);
		var rendererXzbj = new SimpleRenderer(defaultSymbolXzbj);
		featureLayerXzbj.setRenderer(rendererXzbj);
		
		map.addLayer(Imagelayer);
		map.addLayer(Dzdtlayer);
		map.addLayer(featureLayerXzbj);
	})
	.catch(err => {
	  console.error(err)
	})
    },
    components:{//挂子
       TongzhouEdit
  }
}

// --mode 选项参数为命令行覆写默认的模式
</script>
<style scoped>
@import url('http://localhost/arcgis_js_v327_api/arcgis_js_api/library/3.27/3.27compact/dijit/themes/claro/claro.css');
@import url('http://localhost/arcgis_js_v327_api/arcgis_js_api/library/3.27/3.27compact/esri/css/esri.css');
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