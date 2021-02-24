<template>
  <div class="main">
<div class="shit">
  <div class="note">
      <!-- <el-input
      id="textarea"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="note.note">
      </el-input> -->
      <textarea rows="15" cols="40"  id="textarea" v-model="note.note">
      </textarea>
      <el-button type="text" @click="updateOne" style="color:#A0765E;">coding...</el-button>
    </div>

      <div class="a">
          <el-form :model="ruleForm" status-icon  label-width="4px" class="demo-ruleForm">
       
        <el-form-item prop="checkPass">
            <el-input v-model="ruleForm.username" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <!-- label="密码"  -->
        <el-form-item prop="age">
            <el-input v-model.number="ruleForm.password" type="password" size="mini"></el-input>
        </el-form-item>
        <div class="btn">
            <el-button type="primary" @click="submitForm()" size="mini">go</el-button>
            <el-button @click="resetForm()" size="mini">no</el-button>
        </div>
        </el-form>
      </div>
</div>

    
  </div>
</template>

<script>
import {login} from '../api/user.js';
import { queryToday,updateNote } from '../api/note.js'
export default {
  name: '',
  data() {
    return {
        ruleForm: {},
        note: {
          note: '',
        }
    }
  },
  computed: {},
  created() {
    // let that = this;
    // document.onkeypress = function(e) {
    //   var keycode = document.all ? event.keyCode : e.which;
    //   if (keycode == 13) {
    //     that.submitForm();// 登录方法名
    //      return false;
    //   }
    // };

    this.getTodayNote()
  },
  methods: {
    async updateOne(){
      const {data: { code }} = await updateNote(this.note)
      if(code === 200){
        this.$message.success('已经记下了哦 主人')
      }
    },
    async getTodayNote(){
      const {data:{obj}} = await queryToday()
      console.log(obj)
      if(obj == null){
        this.note = {note:''}
      }else{
        this.note = obj
      }
    },
      
      async submitForm(){
          if(!this.ruleForm.username || !this.ruleForm.password){
              this.$message.warning('请输入必填信息');
              return;
          }
        const {data} = await login(this.ruleForm.username,this.ruleForm.password);
        const {obj,code} = data;
        if(code === 200){
           this.$store.dispatch('setToken',obj);
          this.$store.dispatch('setUsername',this.ruleForm.username);
          this.$router.push('/phone')
        }
       
      }
  }
}

</script>
<style scoped lang="less">


.main{
  
  background-image: url("../assets/back.jpg");
  background-size: 100%;
  height: 100%;
  .shit{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .a{
        margin-top: 100px;
        margin-right: 70px;
        width: 200px;
        height: 150px;
        border: 0px solid #948f8f;
        padding: 40px 20px 10px 20px;
        .btn{
            text-align: center;
        }
        border-radius: 10px;
        left: 33%;
        top: 20%;
        // position: absolute;
        //-moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #333333;
    }
  }
  .note{
    width: 30%;
    color: white;
    #textarea{
      background-image: linear-gradient(to right, #F8C381, #A0765E,#F8C381);;
      border: 0px white ;
      border-radius: 1px;
      // -moz-box-shadow:2px 2px 5px #F8C381; 
      // -webkit-box-shadow:2px 2px 5px #F8C381; 
      box-shadow:2px 2px 2px #F8C381;
    }
  }
}


</style>
