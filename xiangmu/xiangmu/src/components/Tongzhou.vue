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
								      @check-change="handleCheckChangeTree"
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
									  		<TongzhouEdit  ref="headerChild" style="float: right;"/>
									    </div>
									  </el-col>
								</el-row>	
		              		</el-main>
					    </el-container>					    
					    <el-row class="mapDiv">
						  <el-col :span="24" style="height: 100%;"><div class="grid-content bg-purple-dark mapContent" id="map" ref="map" style="height: 100%;"> </div></el-col>
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
	        Dzdtlayer:'',
	        Qdrlayer:'',
	        fwFeatureLayer_bhfw:'',
	        fwFeatureLayer_qfx:'',
	        fwFeatureLayer_fsss:'',
	        fwFeatureLayer_xqfw:'',
	        fwFeatureLayer:'',
	        Xzbjlayer:'',
	        
        }
    },
    methods: {
    	handleCheckChange (data, checked, indeterminate) {//传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
		  /* 主要通过checked进行判断 */
		  if (checked) {
		  	this.clickid=data.id;//不同层级切换时，如果切换到的状态为选中，则通过一个变量先保存下它的id，与后面再度切换进行对边（查看是不是不同层级的切换）
		    let arrclick = [data.id];
		    this.$refs.tree.setCheckedKeys(arrclick);
//		    console.log(arrclick[0],this.Imagelayer)
		    switch (arrclick[0]) {
		        case 71:
		            this.Imagelayer.setVisibility(true);
		            this.Dzdtlayer.setVisibility(false);
		            this.Qdrlayer.setVisibility(false);
		            break;
		        case 72:
		            this.Imagelayer.setVisibility(false);
		            this.Dzdtlayer.setVisibility(true);
		            this.Qdrlayer.setVisibility(false);
		            break;
		        case 73:
		            this.Imagelayer.setVisibility(false);
		            this.Dzdtlayer.setVisibility(false);
		            this.Qdrlayer.setVisibility(true);
		            break;
		    }
		  }
		  if(!checked &&(data.id==this.clickid)){//如果点击是选中的本身 还是将选中赋值给自身
		  	this.$refs.tree.setCheckedKeys([data.id]);
		  }		  
		}, 
		handleCheckChangeTree(data, checked, indeterminate){//树形控件 大tree
			switch (data.id) {
		        case 1:
		            this.fwFeatureLayer_bhfw.setVisibility(checked);        
		            break;
		        case 2:
		            this.fwFeatureLayer_qfx.setVisibility(checked);        
		            break;
		        case 3:
		            this.fwFeatureLayer_fsss.setVisibility(checked);        
		            break;
		        case 4:
		            this.fwFeatureLayer_xqfw.setVisibility(checked);        
		            break;
		        case 5:
		            this.fwFeatureLayer.setVisibility(checked);        
		            break;
		        case 6:
		            this.Xzbjlayer.setVisibility(checked);        
		            break;
		   }
		},
    },
    mounted() {//html加载完成后执行。执行顺序：子组件-父组件
		console.log("父组件获取子组件data"+this.$refs.headerChild.activeIndex);//父组件获取子组件data 根据ref
    },
    created() {
    	//底图服务
	var urlPrefix="http://tzfw.natapp1.cc/arcgis/rest/services/";
    let tzdz_url="http://tzfw.natapp1.cc/arcgis/rest/services/TZDZDT/MapServer";//电子地图
	let tzyx_url="http://tzfw.natapp1.cc/arcgis/rest/services/ImageTZ/MapServer";//影像服务	
	var tzqdr_url="http://tzfw.natapp1.cc/arcgis/rest/services/TZQDR/MapServer";//qdr
	var tzxzbj_url="http://tzfw.natapp1.cc/arcgis/rest/services/TZXZBJ/MapServer";//边界
	var tzfeature_url_bhfw=urlPrefix+"WWWFFF/FeatureServer/0";//要素服务_变化房屋
	var tzfeature_url_qfx=urlPrefix+"WWWFFF/FeatureServer/1";//要素服务_切分线
	var tzfeature_url_fsss=urlPrefix+"WWWFFF/FeatureServer/2";//要素服务_附属设施
	var tzfeature_url_xqfw=urlPrefix+"WWWFFF/FeatureServer/3";//要素服务_小区范围
	var tzfeature_url=urlPrefix+"WWWFFF/FeatureServer/4";//要素服务_房屋
	var tzfeature_url_dxkj=urlPrefix+"WWWFFF/FeatureServer/5";//要素服务_地下空间
	var tzmapserver_url=urlPrefix+"WWWFFF/MapServer";//要素服务
//	let map;
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
	  		this.$root.map = new Map("map", {			
//			basemap: tzyx_url,
			//去掉esri图标和缩放图标
			logo:false,
			slider:false,
			//        center: [-83.244, 42.581],
			zoom: 2
		});
		this.Imagelayer = new esri.layers.ArcGISTiledMapServiceLayer(tzyx_url);//影像
		this.Dzdtlayer = new esri.layers.ArcGISTiledMapServiceLayer(tzdz_url);//电子
		this.Qdrlayer = new esri.layers.ArcGISTiledMapServiceLayer(tzqdr_url);//qdr
		this.Xzbjlayer = new ArcGISDynamicMapServiceLayer(tzxzbj_url);
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
		
		this.$root.map.addLayer(this.Imagelayer );
		this.$root.map.addLayer(this.Dzdtlayer);
		this.$root.map.addLayer(featureLayerXzbj);
		this.Imagelayer.setVisibility(false);
		this.Qdrlayer.setVisibility(false);
		
		//房屋变化弹框
        var infoTemplate_bhfw = new InfoTemplate("<i class='fa fa-fw fa-file'>房屋变化信息</i>",function click(fea) {
//          return clickBHFW(fea);
        });		
		var featureLayerOptions_bhfw = {
		  id: "OBJECTID_0",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
		  infoTemplate: infoTemplate_bhfw,
		};		
		this.fwFeatureLayer_bhfw = new FeatureLayer(tzfeature_url_bhfw, featureLayerOptions_bhfw);
		//切分线弹框
        var infoTemplate_qfx = new InfoTemplate("<i class='fa fa-fw fa-file'>切分线信息</i>",function click(fea) {
//          return clickQFX(fea);
        });		
		var featureLayerOptions_qfx = {
		  id: "OBJECTID_1",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
		  infoTemplate: infoTemplate_qfx,
		};		
		this.fwFeatureLayer_qfx = new FeatureLayer(tzfeature_url_qfx, featureLayerOptions_qfx);
		//附属设施弹框
        var infoTemplate_fsss = new InfoTemplate("<i class='fa fa-fw fa-file'>附属设施信息</i>",function click(fea) {
//          return clickFSSS(fea);
        });		
		var featureLayerOptions_fsss = {
		  id: "OBJECTID_2",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
		  infoTemplate: infoTemplate_fsss,
		};		
		this.fwFeatureLayer_fsss = new FeatureLayer(tzfeature_url_fsss, featureLayerOptions_fsss);
		//小区范围弹框
        var infoTemplate_xqfw = new InfoTemplate("<i class='fa fa-fw fa-file'>小区范围信息</i>",function click(fea) {
//         return clickXQFW(fea);
        });		
		var featureLayerOptions_xqfw = {
		  id: "OBJECTID_3",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
		  infoTemplate: infoTemplate_xqfw,
		};		
		this.fwFeatureLayer_xqfw = new FeatureLayer(tzfeature_url_xqfw, featureLayerOptions_xqfw);
		//房屋信息弹框
        var infoTemplate = new InfoTemplate("<i class='fa fa-fw fa-file'>房屋数据信息</i>",function click(fea) { 
//          return clickFWSJ(fea);
        });
        var fw_featureLayerOptions = {
		  id: "OBJECTID_4",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
		  infoTemplate: infoTemplate,
		};
		this.fwFeatureLayer = new FeatureLayer(tzfeature_url, fw_featureLayerOptions);
		this.fwFeatureLayer.minScale=10000;
		//地下空间无弹框
//		var infoTemplate = new InfoTemplate("<i class='fa fa-fw fa-file'>地下空间信息</i>",function click(fea) {           
//          return clickDXKJ(fea);
//      });
        var featureLayerOptions_dxkj = {
		  id: "OBJECTID_5",
		  mode: FeatureLayer.MODE_ONDEMAND,
		  outFields: ["*"],
//		  infoTemplate: infoTemplate,
		};
		this.fwFeatureLayer_dxkj = new FeatureLayer(tzfeature_url_dxkj, featureLayerOptions_dxkj);
		//添加各要素图层
//		map.addLayer(fwFeatureLayer_dxkj);//地下空间
		this.fwFeatureLayer.setDefinitionExpression(`(NYSJZT!='-1' or NYSJZT IS NULL) and (SJZT!='-1' or SJZT IS NULL) `);//不显示内业数据状态是-1和外业数据状态是-1状态graphics 参数是sql语句
		this.fwFeatureLayer_bhfw.setDefinitionExpression(`(NYSJZT!='-1' or NYSJZT IS NULL) and (SJZT!='-1' or SJZT IS NULL)`);//不显示-1状态graphics
		this.fwFeatureLayer_fsss.setDefinitionExpression(`(NYSJZT!='-1' or NYSJZT IS NULL) and (SJZT!='-1' or SJZT IS NULL)`);//不显示-1状态graphics
		this.fwFeatureLayer_xqfw.setDefinitionExpression(`(NYSJZT!='-1' or NYSJZT IS NULL) and (SJZT!='-1' or SJZT IS NULL)`);//不显示-1状态graphics
		this.$root.map.addLayers([this.fwFeatureLayer_xqfw,this.fwFeatureLayer,this.fwFeatureLayer_bhfw,this.fwFeatureLayer_fsss,this.fwFeatureLayer_qfx]);
		this.fwFeatureLayer.minScale = 5000;
		this.fwFeatureLayer_fsss.minScale = 5000;
		this.fwFeatureLayer.setVisibility(false);
		this.fwFeatureLayer_qfx.setVisibility(false);
		this.fwFeatureLayer_fsss.setVisibility(false);		
		this.fwFeatureLayer_dxkj.setVisibility(false);
		//测量工具         
		this.$root.drawToolbar = new Draw(this.$root.map, {
            tooltipOffset: 20,
            drawTime: 90
        });
        this.$root.edittool = new Edit(this.$root.map, {
            allowAddVertices: true,
            allowDeleteVertices: true
        }); debugger
        console.log(this.$root.drawToolbar)
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