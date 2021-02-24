<template>
  <div>
      <el-container style="height: 600px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu>
         <!-- :default-openeds="['1', '3']" -->
      <el-menu-item index="2" @click="toPhone">
        <i class="el-icon-phone"></i>
        <span slot="title">电话管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="toState">
        <i class="el-icon-setting"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="toBanner">
        <i class="el-icon-picture"></i>
        <span slot="title">banner管理</span>
      </el-menu-item>
      <el-menu-item index="6" @click="toNotice">
        <i class="el-icon-tickets"></i>
        <span slot="title">声明编辑</span>
      </el-menu-item>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 16px">
      <el-dropdown  @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <span>{{this.$store.state.username}}</span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>查看</el-dropdown-item> -->
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
       <!-- 修改密码弹出框 -->
                <div class="dialog">
                  <el-dialog :visible.sync="dialogFormVisible" width="30%" center  :show-close='false' :append-to-body="true"> 
                    <el-form :model="form">
                      <el-form-item label="原密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" auto-complete="off" placeholder="输入原密码" size="mini" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input v-model="form.newPassword" auto-complete="off" placeholder="输入新密码" size="mini" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="重复" :label-width="formLabelWidth">
                        <el-input v-model="form.confirmPassword" auto-complete="off" placeholder="重复新密码" size="mini" type="password"></el-input>
                      </el-form-item>
                    </el-form> 
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                      <el-button type="primary" @click="alter()" size="mini">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
    </el-header>
     
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import {logout,alterPassword} from '../api/user.js'
import { clearAllCookies} from '../util/auth.js'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible:false,
      formLabelWidth: "60px",
      form: {},
    }
    // const item = {
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    // };
    // return {
    //     tableData: Array(20).fill(item)
    // }
  },
  computed: {},
  methods: {
    handleCommand(command){
      // var user = getUserInfo();
      // user = JSON.parse(user)
      // console.log(user.trueName)
      // if (!user.trueName) {
      //     this.$message.warning("您已退出登录")
      //     this.show = false;
      //     return;
      // }
      if (command == 'a') {
          this.dialogFormVisible = true;
        }else if (command == 'b') {
          // console.log("退出登录")
          try {
            logout().then(res => {
              //clearAllCookies();
              // const user = {}
              // setUserInfo(user);
              // setToken('');
              //this.$store.dispatch('setName','');
              // this.$store.dispatch('resetVuex');
              clearAllCookies();
              this.$router.push('/login')
            })
          } catch (error) {
            
          }
          
        }
      
      
    },
  
    alter(){
      if(!this.form.password || !this.form.newPassword || !this.form.confirmPassword){
        this.$message.warning('请输入必选项');
        return;
      }
      if(this.form.newPassword != this.form.confirmPassword){
        this.$message.warning('新输入的两次密码不同');
        return;
      }
      alterPassword(this.form.password,this.form.newPassword).then(res => {
        clearAllCookies();
        this.$router.push('/login');
        this.$message.success('修改成功，请重新登录');
        this.dialogFormVisible = false;
      })
    },
    async logout(){
      const {data:{obj}} = await logout();
      this.$router.push('/login');
    },
    
      toPhone(){
          this.$router.push('/phone')
      },
      toState(){
          this.$router.push('/about')
      },
      toNotice(){
        this.$router.push('/notice')
      },
      toBanner(){
        this.$router.push('/banner')
      },
  }
}

</script>
<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
