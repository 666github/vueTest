<template>
    <div style="height: 100%;width: calc(100% - 18px);">
        <el-container style=" border: 1px solid #eee;height: 100%;width: 100%;">                                 
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
			    <el-container class="containerDiv" ref="containerDiv">
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
			   		<el-main class="mainDiv">
		              	<el-container>
						    <el-aside width="200px" style="background-color: rgb(238, 241, 246);z-index:1;">
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
								  	<el-select v-model="value" placeholder="图层选择" style="width: 120px;z-index: 1;" @change="drawer = true">
									    <el-option
									      v-for="item in tcselect1"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
								    </el-select>
								    <el-select v-model="valueJie" placeholder="街乡镇" style="width: 100px;z-index: 1;">
									    <el-option
									      v-for="item in tcselect1"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
								    </el-select>
								    <el-select v-model="valueCun" placeholder="村社区" style="width: 100px;z-index: 1;">
									    <el-option
									      v-for="item in tcselect1"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
								    </el-select>
								  </div></el-col>
								  <el-col :span="6">
								  	<div class="grid-content bg-purple">
								  	<el-select v-model="value1" placeholder="图层选择" style="width: 120px;z-index: 1;">
									    <el-option
									      v-for="item in tcselect1"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
								    </el-select>
								    <el-input v-model="input" placeholder="请输入id" prefix-icon="el-icon-search" style="width: 100px;z-index: 1;"></el-input>
								  </div>
								  </el-col>
									  <el-col :span="10">
									  	<div class="grid-content bg-purple">
									  		<TongzhouEdit style="float: right;"/>
									    </div>
									  </el-col>
								</el-row>	
		              		</el-main>
					    </el-container>					    
					    <el-row class="mapDiv">
						  <el-col :span="24" style="height: 100%;"><div class="grid-content bg-purple-dark mapContent" id="map" style="height: 100%;"> </div></el-col>
						</el-row>
		            </el-main>
			        <el-footer id="ft" ref='ft'>Footer</el-footer>
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
        return {           
            input:'',
            drawer: false,
            direction: 'ltr',
			value:'图层',
            tcselect1: [{
	          value: 0,
	          label: '变化房屋'
	        }, {
	          value: 1,
	          label: '附属设施'
        	},{
	          value: 2,
	          label: '小区范围'
        	},{
	          value: 3,
	          label: '房屋数据'
        	},{
	          value: 4,
	          label: '分割线'
	        }],	        
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
	        clickid:'1',
	        Imagelayer:'',
	        Dzdtlayer:''
        }
    },
    methods: {
    	handleCheckChange (data, checked, indeterminate) {//传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
		  /* 主要通过checked进行判断 */
		  if (checked) {
		  	this.clickid=data.id;//不同层级切换时，如果切换到的状态为选中，则通过一个变量先保存下它的id，与后面再度切换进行对边（查看是不是不同层级的切换）
		    let arrclick = [data.id];
		    this.$refs.tree.setCheckedKeys(arrclick);
		    console.log(arrclick[0],this.Imagelayer)
		    switch (arrclick[0]) {
		        case 71:
		            this.Imagelayer.setVisibility(true);
		            this.Dzdtlayer.setVisibility(false);
//		            Qdrlayer.setVisibility(false);
		            break;
		        case 72:
		            this.Imagelayer.setVisibility(false);
		            this.Dzdtlayer.setVisibility(true);
//		            Qdrlayer.setVisibility(false);
		            break;		        
		    }
		  }
		  if(!checked &&(data.id==this.clickid)){//如果点击是选中的本身 还是将选中赋值给自身
		  	this.$refs.tree.setCheckedKeys([data.id]);
		  }		  
		}, 
    },
    mounted() {//html加载完成后执行。执行顺序：子组件-父组件
//    this.restaurants = this.loadAll();
    },
    created() {
    let tzdz_url="http://tzfw.natapp1.cc/arcgis/rest/services/TZDZDT/MapServer";//电子地图
	let tzyx_url="http://tzfw.natapp1.cc/arcgis/rest/services/ImageTZ/MapServer";//影像服务	
	let map;
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
		this.Imagelayer = new esri.layers.ArcGISTiledMapServiceLayer(tzyx_url);//影像
		this.Dzdtlayer = new esri.layers.ArcGISTiledMapServiceLayer(tzdz_url);//电子
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
		
		map.addLayer(this.Imagelayer );
		map.addLayer(this.Dzdtlayer);
		map.addLayer(featureLayerXzbj);
		this.Imagelayer.setVisibility(false);
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
 .el-dialog__wrapper{width: 310px;}
 .el-footer{border: solid 1px red;z-index: 1;position: absolute;bottom: 0;width: 100%;}
.mapDiv{position: absolute;left: 0;top: 60px;width: 100%;height: calc(100% - 60px);}
.mainDiv{position: absolute;top:60px;overflow: hidden;width:100%;border: solid 1px red;height: calc(100% - 120px)}
.containerDiv{position: relative;height: 100%;}
</style>