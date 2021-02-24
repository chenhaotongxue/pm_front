<template>
  <div class="about">
    <el-card class="box-card">
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
            prop="note"
            label="笔记"
            width="500">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
        <el-button @click="query(scope.row.note)" type="text" size="small">查看</el-button>
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


       <el-dialog title="笔记内容" :visible.sync="addDialog" width="60%">
       <div>
          <span>{{msg}}</span>
       </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getAllNote } from '../api/note.js'
export default {
  name: "Home",
  mounted(){
    this.selectAll();
  },
  methods:{
    query(state){
      this.addDialog = true;
      this.msg = state
    },
      async selectAll(){
        const {data : {obj}} = await getAllNote(this.pageInfo.pageNum,this.pageInfo.pageSize);
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
      tableData: [],
      msg: ''
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

