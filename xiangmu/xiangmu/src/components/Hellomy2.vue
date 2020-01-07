<template>
    <div>
        this is my vue2<Hellomychild/>
        <span>{{message}}</span>
        <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
        </el-dialog>
        <div>
            <el-container style=" border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                  <el-menu :default-openeds="['1']">
                    <el-submenu index="1">
                      <template slot="title"><i class="el-icon-message"></i>导航一</template>
                      <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                      <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                      <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>                   
                  </el-menu>
                </el-aside>
                
                <el-container>
                  <el-header style="text-align: right; font-size: 12px">                    
                    <!-- 下拉 -->
                    <el-dropdown>
                      <i class="el-icon-setting" style="margin-right: 15px"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>                  
                    <span>王小虎</span>
                  </el-header>                
                  <el-main>
                      <div>
                          <el-link icon="el-icon-edit">编辑</el-link>
                          <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
                          <el-button type="primary" icon="el-icon-search">搜索</el-button>
                          <!-- 设置v-model绑定变量，选中意味着变量的值为相应 Radio label属性的值 -->                         
                          <el-radio-group v-model="radio" @change="changeFun" size="mini" text-color="red">
                            <!-- value/v-model,label,disabled,name,size,border -->
                            <el-radio v-model="radio"  label="1" border>备选项1</el-radio>
                            <el-radio v-model="radio" label="2">备选项2</el-radio>
                            <el-radio v-model="radio" label="禁用" >禁用</el-radio>
                            <el-radio v-model="radio" label="选中且禁用"  disabled>选中且禁用</el-radio>
                            <!-- label,disabled,name -->
                            <el-radio-button v-model="radio"  >radio改btn</el-radio-button>                          
                            <el-checkbox v-model="checked"  :indeterminate="isIndeterminate">备选项</el-checkbox>
                          </el-radio-group>
                          <!--多选 indeterminate-->
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <!--v-model 如果存在指定的值则为选中状态，否则为不选中 -->
                            <el-checkbox-group :min="1" :max="3"  v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                          <el-row>
                            <el-col :span="12">
                              <el-input 
                                placeholder="请输入内容"
                                v-model="input"
                                :disabled="true" prefix-icon="el-icon-search" suffix-icon="el-icon-date" size="mini" >
                              </el-input>                              
                            </el-col>
                            <el-col  :span="12">
                              <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable show-password>
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                              </el-input>
                            </el-col>
                          </el-row>
                          <el-row>
                            <!--  show-word-limit属性来展示字数统计 -->
                            <el-col :span="12">
                              <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="数字统计"
                                v-model="textarea"
                                maxlength="10"
                                show-word-limit>
                            </el-input>
                            </el-col>
                            <el-col :span="12">
                                <!-- autosize可以是对象也可以单独是一个属性 -->
                                <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="textarea">
                              </el-input>
                            </el-col>
                          </el-row>                       
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
                    <el-table :data="tableData">
                      <el-table-column prop="date" label="日期" width="140">
                      </el-table-column>
                      <el-table-column prop="name" label="姓名" width="120">
                      </el-table-column>
                      <el-table-column prop="address" label="地址">
                      </el-table-column>
                    </el-table>
                    <el-table :data="tableData2">
                        <el-table-column prop="date2" label="日期2" width="140">
                        </el-table-column>
                        <el-table-column prop="name2" label="姓名2" width="120">
                        </el-table-column>
                        <el-table-column prop="address2" label="地址2">
                        </el-table-column>
                      </el-table>
                      <!-- 计数 -->
                      <!-- step步数 precision经度 -->
                      <el-input-number v-model="num" @change="handleChange" :min="1" :max="30" label="描述文字" ></el-input-number>
                      <!-- controls是否使用按钮 -->
                      <el-input-number v-model="num" @change="handleChange" :min="1" :max="30" label="描述文字" :step="10" :precision="2" :controls="false"></el-input-number>
                      <!-- 严格步数 按钮位置 -->
                      <el-input-number v-model="num" @change="handleChange" :min="1" :max="20" label="描述文字" :step="2" step-strictly controls-position="right"></el-input-number>
                  </el-main>
                </el-container>
              </el-container>              
        </div>
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
        <!-- 对话弹框 -->
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 对话框 -->
        <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-dialog>
        <!-- 懒加载 -->
        <div style="width: 500px;margin:0 auto;height: 300px;overflow: auto;">
            <div class="demo-image__lazy">
              <!-- 懒加载效果如果不显示需要：设置style 打成块，设置高度 -->
              <el-image v-for="fit in fits" :key="fit.id" :src="fit.url" lazy style="display: block;min-height: 200px;"></el-image>
            </div>
        </div>      
        <!-- 图片 -->
        <div class="demo-image">
         <div class="block" v-for="fit in fits" :key="fit.fitImg">
          <span class="demonstration">{{ fit.fitImg }}</span>
          <!-- :preview-src-list 浏览大图 -->
          <el-image
            style="width: 100px; height: 100px"
            :src="fit.url"
            :fit="fit.fitImg"
            :preview-src-list="bigImgs"
            >
          </el-image>        
        </div>
      </div>
      <!-- 回到顶部 组件源码中有配置，如果只是单纯使用 只写标签就行，案例中直接拷入会报错 -->
      <el-backtop>up</el-backtop>
      <!-- 滚动加载 -->
      <ul class="infinite-list" v-infinite-scroll="loads" style="overflow:auto;height: 100px;border:solid 1px red;" >
        <li v-for="i in count"  class="infinite-list-item">{{countsImg[i]}}</li>
      </ul>
      <!-- drawer抽屉 与dialog不同的是，它适合较长的表单或临时展示文档 -->
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;"> 左侧打开 </el-button>     
      <!-- :with-header="false"去掉标题该设置不起作用 -->
      <el-drawer
        title="标题"
        :direction="direction"
        :visible.sync="drawer"
        >
        <span>我来啦!</span>
      </el-drawer>
    </div>
</template>
<script>
import Hellomychild from './HelloMychild.vue'

  //tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。
  // import imgs from '../assets/panda3.jpg';
export default {
    name:'Hellomy',
    components:{Hellomychild},
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
            gridData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogTableVisible: false,
            fits: [
              {fitImg:'fill',url:require('../assets/pgy.jpg'),title:'fill',id:1},
              {fitImg:'contain',url:require('../assets/panda3.jpg'),title:'contain',id:2},
              {fitImg:'cover',url:require('../assets/pgy.jpg'),title:'cover',id:3},
              {fitImg:'none',url:require('../assets/panda3.jpg'),title:'none',id:4},
              {fitImg:'scale-down',url:require('../assets/pgy.jpg'),title:'scale-down',id:5}
            ],
            // fits:[{fitImg:'fill',url:imgs,title:'fill'}]
            bigImgs:[
              require('../assets/pgy.jpg'),
              require('../assets/panda3.jpg')
            ],
            count: 0,
            countsImg:[],
            drawer: false,
            direction: 'ltr',
            forChildMsg:'1234567890'
        }
    },
    methods: {
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