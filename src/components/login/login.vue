<template>
  <div class="all">
    <!--<div class="title">
      <h1>登录</h1>
    </div>-->
    <div class="login">
      <legend class="title">登录</legend>
      <el-form ref="登录" :model="formData" :rules="rules" size="medium" label-width="100px" style="width:500px; height=500px" title="login">
        <el-form-item class="form" label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" clearable prefix-icon='el-icon-phone-outline'
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item class="form" label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <div>
          <el-button type="primary" @click="submitForm">用户登录</el-button>
          <el-button type="primary" @click="submitForm2">商家登录</el-button>
          </div>
          <!--<el-button @click="resetForm">重置</el-button>-->
          <div class="registerbutton">
          <el-button @click="showRegister">用户注册</el-button>
          <el-button @click="showRegister2">商家注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <register :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></register>
    <register2 :addOrUpdateVisible2="addOrUpdateVisible2" @changeShow2="showAddOrUpdate2" ref="addOrUpdateRef2"></register2>
  </div>
</template>
<script>
import Axios from 'axios'
import register from './register'
import register2 from './register2'
export default {
  components: {
    register, register2
  },
  props: [],
  data () {
    return {
      formData: {
        phone: undefined,
        password: undefined
      },
      addOrUpdateVisible: false,
      addOrUpdateVisible2: false,
      rules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs['登录'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        Axios.get('http://10.128.30.77:9090/user/login?phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
          if (res.data === 'fail') {
            this.$message.error(res.data)
          } else {
            this.$router.push({path: '/home'})
          }
        })
      })
    },
    submitForm2 () {
      this.$refs['登录'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        Axios.get('http://10.128.30.77:9090/store/login?phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
          if (res.data === 'fail') {
            this.$message.error(res.data)
          } else {
            this.$router.push({path: '/home'})
          }
        })
      })
    },
    resetForm () {
      this.$refs['登录'].resetFields()
    },
    showRegister () {
      this.addOrUpdateVisible = true
    },
    showRegister2 () {
      this.addOrUpdateVisible2 = true
    },
    showAddOrUpdate (data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    },
    showAddOrUpdate2 (data) {
      if (data === 'false') {
        this.addOrUpdateVisible2 = false
      } else {
        this.addOrUpdateVisible2 = true
      }
    }
  }
}

</script>
<style lang="less" src="./login.less" scoped></style>
