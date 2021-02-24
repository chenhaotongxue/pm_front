<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>全部留言（{{pageInfo.total}}）</span>
        </div>
        <div>
          <el-input v-model="value" placeholder="请输入微信名" size="mini" style="width:70%"></el-input>
           <el-button style="float: right;margin-left:10px;" type="primary" size="mini" @click="search">搜索</el-button>
        </div>
       
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type = "index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="微信"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="留言内容">
          </el-table-column>
          <el-table-column
            prop="replyContent"
            label="回复内容">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
        <el-button @click="reply(scope.row)" type="text" size="small">回复</el-button>
        <el-button type="text" size="small" v-preventClick v-if="scope.row.isShow === 1" @click="noShow(scope.row)">不显示</el-button>
        <el-button type="text" size="small" v-preventClick v-if="scope.row.isShow === 0" style="color:#cccccc;" @click="showIt(scope.row)">显示</el-button>
        <el-button type="text" size="small" v-preventClick @click="isNice(scope.row)">设为精彩评论</el-button>
        <el-button type="text" v-preventClick @click="del(scope.row.id,scope.$index)">移除</el-button>
      </template>
          </el-table-column>
        </el-table>

        <div style="margin-top:20px;textAlign:right;">
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total">
            </el-pagination>
        </div>
      </div>


       <el-dialog title="回复内容" :visible.sync="addDialog" width="30%">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          placeholder="请输入回复的内容"
          v-model="content">
        </el-input>
        <div slot="footer" class="dialog-footer" style="textAlign:center;">
          <el-button type="primary" @click="ensureReply" size="small" style="width:60%">回复</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { insertMessage,updateMessage,selectByPage,selectByNickName,deleteById } from '../api/message.js'
export default {
  name: "Home",
  mounted(){
    this.selectAll();
  },
  methods:{
     del(id,index){
      this.$confirm('确定删除该条消息吗, 一旦删除就彻底没了?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data:{obj}} = await deleteById(id);
          this.$message.success('删除成功');
          this.tableData.splice(index,1);

        }).catch(() => {
              
        });
    },
    async isNice(row){
      row.isNice = 1;
      const {data:{obj}} =await updateMessage(row);
      this.$message.success("已设置为精彩评论");
      this.selectAll();
    },
    async noShow(row){
      row.isShow = 0;
      const {data:{obj}} =await updateMessage(row);
      this.$message.success("已修改为不可见");
      this.selectAll();
    },
    async showIt(row){
      row.isShow = 1;
      const {data:{obj}} =await updateMessage(row);
      this.$message.success("已修改为可见");
      this.selectAll();
    },
    async search(){
      if(!this.value){
        this.selectAll();
        return;
      }
      const {data:{obj}} = await selectByNickName(this.value);
      this.tableData = obj;
    },
    async ensureReply(){
      if(!this.content){
        this.$message.warning('你都没输入内容，你回复个锤子');
        return;
      }
      this.currentRow.replyContent = this.content;
      const {data:{obj}} = await updateMessage(this.currentRow);
      this.$message.success('修改成功');
      this.addDialog = false;
      this.selectAll();
    },
     handleClick(row) {
        console.log(row);
      },
      reply(row){
        this.addDialog = true;
        this.currentRow = row;

      },
      async selectAll(){
        const {data : {obj}} = await selectByPage(this.pageInfo.pageNum,this.pageInfo.pageSize);
        this.tableData = obj.list;
        this.pageInfo.total = obj.total;
      },
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.selectAll();
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val;
        this.selectAll();
      }
  },
  data(){
    return{
      content: '',
      addDialog: false,
      value: '',
      pageInfo:{
        pageNum: 1,
        pageSize: 20,
        total: 100
      },
      currentRow: {},
      tableData: []
    }
  }
};
</script>
<style lang="less" scoped>
.clearfix {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .box-card {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  .table{
    margin-bottom: 100px;
  }
</style>

