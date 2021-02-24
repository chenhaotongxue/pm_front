<template>
  <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10}"
        placeholder="请输入声明内容"
        v-model="value">
        </el-input>

        <div class="btn">
          <el-button type="primary" @click="update" v-preventClick>确定输入</el-button>
        </div>
  </div>
</template>

<script>
import { updateNotice,selectStatement } from '../api/banner.js';
// var checkClick = function() {
//     var clicktag = 0;
//     let ele = document.getElementById("bb");
//     ele.click(function () {
//         if (clicktag == 0) {
//             clicktag = 1;
//             setTimeout(function () {clicktag = 0}, 500);
//         }
//         else{
//             showMsgDialog("请勿频繁点击！");
//         }
//     });
// };
export default {
  name: '',
  data() {
    return {
        value:''
    }
  },
  computed: {},
  mounted(){
    this.getStatement();
  },
  methods: {
    async getStatement(){
      const {data:{obj}} = await selectStatement('声明');
      this.value = obj.content;
    },
    async update(){
      const {data:{obj}} = await updateNotice(this.value);
      this.$message.success('修改成功');
    },
  }
}

</script>
<style scoped lang="less">
.btn{
  text-align: center;
  padding: 20px;
  button{
    width:300px;
  }
}
</style>
