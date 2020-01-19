<template>
   <div>
   	 <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" style="z-index: 1;">
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
        activeIndex2: '1',
        drawEvent:null
      };
    },
    methods: {
      	handleSelect(key, keyPath) {
        	console.log(key, keyPath);
	        switch (key){
	        	case "1-1":
	        		this.$root.drawToolbar.activate(esri.toolbars.Draw.POLYLINE);
			        this.drawEvent = dojo.connect(this.$root.drawToolbar, 'onDrawEnd', this.areaOrLength);
	        		break;
	        	case "1-2":console.log(this.$root)
			        this.$root.drawToolbar.activate(esri.toolbars.Draw.POLYGON);
	        		if (this.drawEvent) dojo.disconnect(this.drawEvent);
	        		this.drawEvent = dojo.connect(this.$root.drawToolbar, 'onDrawEnd', this.areaOrLength);
	        		break;	        		
	        	default:
	        		break;
	        }
        },
 		areaOrLength(geometry) {
		    this.mapClear();
		    geometry.spatialReference.wkid = 2436;
		    switch (geometry.type) {
		        case "point":
		            var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 0, 0, 0.05]));
		            graphicCenterPoint = geometry;
		            break;
		        case "polyline":
		            var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1);
		            //获得每个点的经纬度坐标
		            var points = geometry.paths[0];
		            var distance, lineLength = 0;
		            var result = {};
		            var lengths = {};
		            for (var i = 0; i < points.length - 1; i++) {
		                var x1 = points[i][1];
		                var y1 = points[i][0];
		                var x2 = points[i + 1][1];
		                var y2 = points[i + 1][0];
		                distance = this.getFlatternDistance2(x1, y1, x2, y2);
		                lineLength = distance += lineLength;
		            }
		            lengths['0'] = lineLength;
		            result.lengths = lengths;
		            this.outputAreaAndLength(result, geometry);//result获得平面坐标
		            break;
		        case "polygon":
		            var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0]));
		            var points = new Array();
		            var result = {};
		            var areas = {};
		            var rings = geometry.rings[0];
		            for (var i = 0; i < rings.length; i++) {
		                var x = rings[i][1];
		                var y = rings[i][0];
		//              var xy = wgs84Tosh(x, y);
		//              points.push(xy);
						points.push([x,y]);
		            }
		            areas['0'] = this.polygonArea(points);
		            result.areas = areas;
		            this.outputAreaAndLength(result, geometry);
		            break;
		    }
	    var graphic = new esri.Graphic(geometry, symbol);
	    this.$root.map.graphics.clear();
	    this.$root.map.graphics.add(graphic);console.log(2,this.$root.drawToolbar)
	    this.$root.drawToolbar.deactivate();
	    dojo.disconnect(this.drawEvent);
	    this.drawEvent = null;
	},
	mapClear() {
	    this.$root.map.graphics.clear();
	    this.$root.map.infoWindow.hide();	    
	},
	outputAreaAndLength(result, geo) {
	    var point = geo.getExtent().getCenter();
	    this.$root.map.infoWindow.resize(270, 300);//设置窗口大小
	    var txt = "";
	    if (result.areas != null) {
	        var num = result.areas[0].toFixed(2);
	        var info = num + "平方米";
	        if (num > 999999) {
	            info = (num / 1000000).toFixed(2) + "平方千米";
	            if (num / 1000000 > 999)
	                info = (num / 1000000 / 10000).toFixed(2) + "万平方千米";
	        }
	        this.$root.map.infoWindow.setTitle("面积测算");
	        this.$root.map.infoWindow.setContent("面积：" + info);
	        this.$root.map.infoWindow.show(point);
	    } else {
	        var num = result.lengths[0].toFixed(2);
	        var info = num + "米";
	        if (num > 999) {
	            info = (num / 1000).toFixed(2) + "千米";
	            if (num / 1000 > 999)
	                info = (num / 1000 / 10000).toFixed(2) + "万千米";
	        }
	        this.$root.map.infoWindow.setTitle("长度测算");
	        this.$root.map.infoWindow.setContent("距离：" + info);
	        this.$root.map.infoWindow.show(point);
	    }
	},
	getFlatternDistance2(lat1, lng1, lat2, lng2) {
	    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
	},
	polygonArea(points) {
	    var i, j;
	    var area = 0;
	    for (i = 0; i < points.length; i++) {
	        j = (i + 1) % points.length;
	        area += points[i][0] * points[j][1];
	        area -= points[i][1] * points[j][0];
	    }
	    area /= 2;
	    var mianji = Math.abs(area);
	    return mianji;
	},

    }
  }

</script>
<style >
el-menu{border: solid 1px #DCDFE6;border-radius: 4px;height: 40px;line-height: 40px;}
.el-menu.el-menu--horizontal{border-bottom: none;}
.el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu{
	height: 40px;line-height: 40px;border-radius: 4px;
	border: 1px solid #DCDFE6;border-bottom-color:#DCDFE6!important;
}
.el-menu--horizontal>.el-submenu{height: 38px;line-height: 38px;}
/*导航 title样式调不了，去掉style的scoped*/
.el-menu--horizontal>.el-submenu>.el-submenu__title{height: 40px;line-height: 40px;}
</style>