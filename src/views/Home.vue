<template>
  <div class="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>全部电话（{{totalCount}}）</span>
        </div>
        <div>
          <el-select v-model="value" placeholder="请选择电话类型" size="mini">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
           <el-button size="mini" type="text" @click="checkNote">查看笔记</el-button>
           <el-button style="float: right; padding: 5px 4px" type="text" @click="add">新增</el-button>
           <el-button style="float: right; padding: 5px" type="primary" @click="search">搜索</el-button>
        </div>
       
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="postName"
            label="单位名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="callCount"
            label="拨打次数">
          </el-table-column>
          <el-table-column
            prop="viewCount"
            label="浏览次数">
          </el-table-column>
          <el-table-column
            prop="likeCount"
            label="收藏次数">
          </el-table-column>
           <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
        </el-table>
      </div>

      <!-- 编辑框 -->
      <el-dialog title="编辑电话" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="序号更改" :label-width="formLabelWidth">
            <el-input v-model="form.sort" autocomplete="off" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form.typeId" placeholder="请选择活动区域"  size="mini" style="width:100%">
              <el-option :label="i.typeName" :value="i.id" v-for="(i,k) in options" :key="k"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.postName" autocomplete="off"  size="mini"></el-input>
          </el-form-item>
          <el-form-item label="热线电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"  size="mini"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="textAlign:center;">
          <el-button type="primary" @click="ensureUpdate" size="small" style="width:60%">确 定</el-button>
        </div>
      </el-dialog>

<!-- 新增弹出框 -->
      <el-dialog title="新增电话" :visible.sync="addDialog" width="30%">
        <el-form :model="form1">
          <el-form-item label="序号更改" :label-width="formLabelWidth">
            <el-input v-model="form1.sort" autocomplete="off" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form1.typeId" placeholder="请选择电话类型"  size="mini" style="width:100%">
              <el-option :label="i.typeName" :value="i.id" v-for="(i,k) in options" :key="k"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form1.postName" autocomplete="off"  size="mini"></el-input>
          </el-form-item>
          <el-form-item label="热线电话" :label-width="formLabelWidth">
            <el-input v-model="form1.phone" autocomplete="off"  size="mini"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="textAlign:center;">
          <el-button type="primary" @click="ensureAdd" size="small" style="width:60%">确定新增</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getAllPhone,getPhoneByType,insertPhone,updatePhone,deletePhone } from '../api/phone.js'
import { getAllPhoneType } from '../api/phoneType.js'
export default {
  name: "Home",
  methods:{
    checkNote(){
      this.$router.push('/note')
    },
    delete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    async ensureUpdate(){
      if(!this.form.sort || !this.form.postName || !this.form.phone || !this.form.typeId){
        this.$message.warning('请输入必选项');
        return;
      }
      const {data : {data}} = await updatePhone(this.form); 
      this.$message.success('修改成功');
      this.getAllPhone();
      this.dialogFormVisible = false;
    },
    async ensureAdd(){
      if(!this.form1.sort || !this.form1.postName || !this.form1.phone || !this.form1.typeId){
        this.$message.warning('请输入必选项');
        return;
      }
      const {data: {data}} = await insertPhone(this.form1);
      this.$message.success('新增成功');
      this.getAllPhone();
      this.addDialog = false;
    },
     handleClick(row) {
       const id = row.id;
        this.$confirm('此操作将永久删除该电话, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data} = await deletePhone(id);
          this.$message.success('delete successfully!!')
          this.getAllPhone();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edit(row){
        this.dialogFormVisible = true;
        this.form = row;
      },
      add(){
        this.addDialog = true;
        this.form1 = {};
      },
      async getAllPhone(){
        const {data:{obj}} = await getAllPhone(1,10);
        this.tableData = obj.list;
        this.totalCount = obj.total;
      },
      async getAllType(){
        const {data: {obj}} = await getAllPhoneType();
        this.options = obj;
      },
      async search(){
        if(!this.value){
          this.getAllPhone();
          return;
        }
        const {data:{obj}} = await getPhoneByType(parseInt(this.value));
        this.tableData = obj;
        this.totalCount = this.tableData.length;
      }
  },
  mounted(){
    this.getAllPhone();
    this.getAllType();
  },
  data(){
    return{
      form: {},
      form1: {},
      formLabelWidth: "80px",
      dialogFormVisible: false,
      addDialog: false,
      value: '',
      totalCount: 0,
      options: [],
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  }
  // components: {
  //   HelloWorld
  // }
};
</script>

<style lang="less" scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  // .clearfix:before,
  .clearfix {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .box-card {
    width: 100%;
    height: auto;
  }
</style>


