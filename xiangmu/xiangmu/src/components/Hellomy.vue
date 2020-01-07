<template>
    <div>
        <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
        <!-- label下拉显示字段 value下拉value值 -->
        <el-select v-model="value" placeholder="单选" filterable @change="changeFun" @visible-change="visibleChange" @blur="blurFun">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
            </el-option>
        </el-select>
        <!-- 多选 -->
        <el-select v-model="value1" multiple placeholder="多选" collapse-tags>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <!-- 级联选择器 hover展开；show-all-levels显示所有级还是最后一级-->
        <el-cascader
        placeholder="默认值-级联请单选"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
        <!-- 多选 折叠展示 show-all-levels:仅显示最后一级   fileterable可搜索-->
        <el-cascader
        filterable
        placeholder="级联请多选"
        :show-all-levels="false"
        :options="options"
        :props="props"
        collapse-tags
        clearable></el-cascader>
        <!-- switch -->
        <el-tooltip :content="'Switch value: ' + switchVal">
          <el-switch
            v-model=" switchVal"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <el-switch @change='changeFun'
          v-model="switchVal"
          active-color="#13ce66"
          active-text="按月付费"
          inactive-text="按年付费">
        </el-switch>
        </el-tooltip> 
        <div style="text-align: left">
            <!-- 时间 -->
            <el-time-picker
            is-range
            v-model="time1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          <!-- 日期 -->
            <el-date-picker
            v-model="date1"
            type="date"
            placeholder="选择日期">
            </el-date-picker> 
            <el-date-picker @change='changeFun'
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            v-model="date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker> 
              <!--日期时间  -->
              <el-date-picker             
              v-model="date1"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <!-- 起始与截止日期时间 -->
            <el-date-picker
            v-model="date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            >
          </el-date-picker>
        </div> 
        <!-- 上传 -->
        <!-- on-preview点击文件列表中已上传的文件时的钩子 -->
        <!-- on-remove文件列表移除文件时的钩子 -->
        <!-- before-remove删除文件之前的钩子 -->
        <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <!-- 头像上传 -->
      <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> 
    <!-- 树形节点 -->
    <el-tree
      :data="data2"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree> 
    <div class="buttons">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div> 
      <!--表格  -->
      <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
             <el-button type="primary" icon="el-icon-star-on" v-if="istag" @click='switchChange'></el-button>
             <el-button type="primary" icon="el-icon-star-off" v-else="!istag" @click='switchChange'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设置总数据数 和每页显示数据个数 -->
      <el-pagination class="fy"
          layout="prev, pager, next"
          @current-change="current_change"
          :total="total"
          :page-size="3"
          background
        >
      </el-pagination>
      <!-- 消息提示弹框 -->
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
      
      
     </div>
</template>
<script>
export default {
    name:'Hellomy',
    data() {
        return {
        props:{ multiple: true },
        options: [{
          value: '选项1',
          label: '房屋'
        }, {
          value: '选项2',
          label: '社区',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }]}, {
          value: '选项3',
          label: '村',
          disabled:true,
        }],
        value: '',
        value1:[],
        switchVal:true,
        time1: [new Date(2019, 11, 20, 0, 0), new Date(2019, 11, 20, 23, 59)],
        date1:'',
        pickerOptions: {
         disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                   {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],   
        imageUrl: '',
        total:5,//默认数据总数 这三个变量为了切页使用
        pagesize:3,//每页的数据条数
        currentPage:1,//默认开始页面
        istag: true,
        tableData: [{
          date: '2016-05-03',
          name: '王虎',
          address: '上海市普陀 1518 弄'
        }, {
          date: '2016-05-02',
          name: '小虎',
          address: '上海 1518 弄'
        }, {
          date: '2016-05-04',
          name: '虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王虎',
          address: '上海市 弄'
        }, {
          date: '2016-08',
          name: '王小虎',
          address: '上海市普陀区金'
        }, {
          date: '20-06',
          name: '王小虎',
          address: '上海市普陀区金沙 151弄'
        }, {
          date: '2016--07',
          name: '王小虎',
          address: '上海市普陀江路 18 弄'
        }],
        data2:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          disabled:true,
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
      
       
    },
    created:function(){
         this.total=this.tableData.length;
      },
    methods: {
        changeFun(){
            console.log(this.value||this.switchVal);
            console.log(this.date1)
        },
        visibleChange(val){//显示隐藏都触发
            if(!val){console.log('隐藏了')}
        },
        blurFun(){
            console.log("失去焦点");
        },
        handleChange(value) {
         console.log(value);
       },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        console.log(localStorage.getItem('token'))
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes(data,checked, node) {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      checkChange(item,node,self){
        if(node==true){
          this.editCheckedId=item.id;
          this.$refs.tree.setCheckedKeys([item.id])
        }else{
          if(this.editCheckedId==item.id){
            this.$refs.tree.setCheckedKeys([item.id]);
          }
        }
      },
      nodeCLick(item,node,self){
        this.editCheckedId==item.id;
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'th';
        }
        return '';
      },
      switchChange(){
          this.istag = !this.istag ;
          
      },
     current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({//返回一个Promise对象便于进行后续操作的处理
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
   
}
</script>
<style scoped>
    span{
        color: red;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>