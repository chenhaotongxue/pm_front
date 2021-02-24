<template>
  <div>
        <div style="padding-left:20px;padding-right:20px">
            <table>
                <tr id="first">
                    <td style="width:100px">
                        <span>序号</span>
                    </td>
                    <td style="width:100px">
                        <span>图片</span>
                    </td>
                    <td style="width:100px">
                        <span>连接</span>
                    </td>
                    <td style="width:100px">
                        <span>次序</span>
                    </td>
                    <td style="width:100px">
                        <span>状态</span>
                    </td>
                    <td style="width:100px">
                        <span>创建时间</span>
                    </td>
                    <td style="width:100px">
                        <span>操作</span>
                    </td>
                </tr>
                <tr id="second" v-for="(item,key) in banners" :key="key">
                    <td>
                        {{key + 1}}
                    </td>
                    <td>
                        <img :src="item.imgUrl" alt="" srcset="" style="width:100px;height:100px;">
                        <!-- <span>{{item.imgUrl}}</span> -->
                        <!-- <img src="F:\img\bannerImg\6239936_092702973000_2.jpg_1571129094547.jpg" alt="" srcset=""> -->
                    </td>
                    <td>
                        <span>{{item.targetUrl}}</span>
                        <!-- http://zhaosheng.hdu.edu.cn/art.php?aid=1504 -->
                    </td>
                    <td>
                        <span>{{item.sort}}</span>
                    </td>
                    <td>
                        <span>{{item.status == 0 ? '禁用' : '开启'}}</span>
                    </td>
                    <td>
                        <span>{{item.createTime}}</span>
                    </td>
                    <td>
                        <el-button type="text" @click="edit(item)">编辑</el-button>
                        <el-button type="text" @click="del(item.id,key)">删除</el-button>
                    </td>
                </tr>
            </table>
        </div>
          <!-- 编辑banner链接 -->
        <div>
            <el-dialog :visible.sync="dialogFormVisible2" width="30%" center  :show-close='false' title="编辑banner"> 
            <el-form :model="form">
                <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="form.targetUrl" auto-complete="off"  size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="次序" :label-width="formLabelWidth">
                <el-input v-model="form.sort" auto-complete="off"  size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="form.status" size="mini" style="width:290px" >
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                <!-- <el-input v-model="form.newPassword" auto-complete="off"  size="mini" type="password"></el-input> -->
                    <el-upload
                        v-model="files"
                        class="upload-demo"
                        ref="upload"
                        action="/pm/upload/uploadImage"
                        :limit="1"
                        :auto-upload="true"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        >
                        <!-- :data="data" -->
                        <!-- :http-request="customUpload" -->
                        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                     <span v-anno style="margin-left:30px">图片支持jpg、png格式，图片最好在xx大小以内</span>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="alter()" size="mini">更新</el-button>
                <el-button @click="dialogFormVisible2 = false" size="mini">取 消</el-button>
            </div>
            </el-dialog>
        </div>

        <div class="btn">
            <el-button type="primary" @click="add">新增</el-button>
        </div>

        <div>
            <el-dialog :visible.sync="dialogFormVisible" width="30%" center  :show-close='false' title="编辑banner"> 
            <el-form :model="obj">
                <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="obj.targetUrl" auto-complete="off"  size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="次序" :label-width="formLabelWidth">
                <el-input v-model="obj.sort" auto-complete="off"  size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="obj.status" size="mini" style="width:290px" >
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                <!-- <el-input v-model="form.newPassword" auto-complete="off"  size="mini" type="password"></el-input> -->
                    <el-upload
                        v-model="files"
                        class="upload-demo"
                        ref="upload"
                        action="/pm/upload/uploadImage"
                        :limit="1"
                        :auto-upload="true"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess1"
                        >
                        <!-- :data="data" -->
                        <!-- :http-request="customUpload" -->
                        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                     <span v-anno style="margin-left:30px">图片支持jpg、png格式，图片最好在xx大小以内</span>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ensureAdd()" size="mini">确定添加</el-button>
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
            </div>
            </el-dialog>
        </div>
        <!-- <img src="http://phone-manage.oss-cn-hangzhou.aliyuncs.com/phone/1592571363682.jpg" alt="" srcset=""> -->
    </div>
</template>

<script>
import {update,updateNotice,selectAll,deleteById,selectByStatus,add} from '../api/banner.js'
// import  customUpload  from '../api/upload.js';
export default {
  name: '',
  data(){
        return{
            dialogFormVisible:false,
            dialogFormVisible2:false,
            formLabelWidth:'50px',
            form:{},
            obj: {},
            banners:[
                {
                    imgUrl: '33',
                    targetUrl: 'sd',
                    status: 1,
                    sort: 3,
                }
            ],
            files:[],
            // BANNER_UPLOAD,
            banner:{},
            data: {},
            fileList: [],
            
        }
    },
   
  computed: {},
  mounted(){
      this.selectAll();
  },
  directives: {
        'title': {
            inserted: function(e) {
                e.style.fontFamily = "宋体";
                e.style.fontSize="18px"
                e.style.fontWeight='700'
            }
        },
        'anno': {
            inserted: function(e) {
                e.style.fontFamily = "宋体";
                e.style.color = "#cccccc"
                e.style.fontSize = "12px"
            },
        },
    },
  methods: {
      async ensureAdd(){
          if(!this.obj.targetUrl || !this.obj.sort || !this.obj.imgUrl || !this.obj.status){
              this.$message.warning('请输入必填项');
              return;
          }
          const {data : {obj}} = await add(this.obj);
          this.$message.success('添加成功');
          this.banners.push(obj);
          this.dialogFormVisible = false;
      },
      add(){
          this.dialogFormVisible = true;
      },
    async alter(){
        const {data:{obj}} = await update(this.form);
        console.log(obj)
        this.$message.success('更新成功');
        this.dialogFormVisible2 = false;
    },
    async selectAll(){
        const {data:{obj}} = await selectAll();
        this.banners = obj;
    },
    async del(id,key){
        this.$confirm('此操作将永久删除该电话, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const {data:{obj}} = await deleteById(id);
            this.$$message.success('删除成功');
            this.selectAll();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    insert(){
        
    },
    
    add(){
        this.dialogFormVisible = true;
    },
    edit(row){
        this.dialogFormVisible2 = true;
        this.form = row;
    },
    handleExceed (files, fileList) {
      			this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
        // 图片上传成功钩子
    handleAvatarSuccess(res, file,filelist){
        const {obj} = res;
        this.form.imgUrl = obj;
        // if (res.code == 200) {
        //     // this.objs.push(res.obj);
        //     this.dialogFormVisible2 = false;
        //     this.$message.success('上传成功')
        // }
    },
    handleAvatarSuccess1(res,file,filelist){
        const {obj} = res;
        this.obj.imgUrl = obj;
    },
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        // if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        // isJPG && 
        return isLt2M;
    },
  }
}

</script>
<style scoped >
table{
        width: 100%;
        border-collapse:collapse;
        /* // border: 1px solid #cccccc; */
        border: 1px solid #D7D7D7;
    }
    td{
        width: 150px;
        height: 80px;
        border-collapse:collapse;
        border: 1px solid #D7D7D7;
        font-family: '宋体';
        font-size: 15px;
        font-weight: 300;
        text-align: center;
       
    }
    #first{
        background-color: #F4FAFD;
        height: 80px;
    }
    .up{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start
    }
.btn{
    text-align: right;
    padding-right: 20px;
    margin-top: 20px;
}
</style>
