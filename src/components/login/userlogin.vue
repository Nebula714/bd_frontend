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
          <el-input show-password v-model="formData.password" placeholder="请输入密码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <div>
          <el-button type="primary" @click="submitForm">用户登录</el-button>
          <!--<el-button @click="resetForm">重置</el-button>-->
          <!--<div class="registerbutton">-->
          <el-button @click="showRegister">用户注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <register :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></register>
    <register2 :addOrUpdateVisible2="addOrUpdateVisible2" @changeShow2="showAddOrUpdate2" ref="addOrUpdateRef2"></register2>
    <register3 :addOrUpdateVisible3="addOrUpdateVisible3" @changeShow3="showAddOrUpdate3" ref="addOrUpdateRef3"></register3>
  </div>
</template>
<script>
import Axios from 'axios'
import register from './register'
import register2 from './register2'
import register3 from './register3'
const baseURL = 'http://10.136.207.156:9090'
export default {
  components: {
    register, register2,register3
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
      addOrUpdateVisible3: false,
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
        Axios.get(baseURL + '/user/login?phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
          if (res.data === '账号错误!' || res.data === '密码错误!') {
            this.$message.error(res.data)
          } else {
            console.log('login success')
            // html5本地存储
            Axios.get(baseURL + '/user/query_phone?phone=' + this.formData.phone).then((res1) =>{
              console.log('login res1')
              console.log(res1.data)
              sessionStorage.setItem('identity', 'user')
              sessionStorage.setItem('user', JSON.stringify(res1.data.id))
            })
            // sessionStorage.setItem('user')
            this.$router.push({path: '/home'})
          }
        })
      })
    },
    submitForm2 () {
      this.$refs['登录'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        Axios.get(baseURL + '/store/login?phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
          if (res.data === '账号错误!' || res.data === '密码错误!') {
            this.$message.error(res.data)
          } else {
            Axios.get(baseURL + '/store/query_phone?phone=' + this.formData.phone).then((res1) =>{
              sessionStorage.setItem('identity', 'store')
              sessionStorage.setItem('store', JSON.stringify(res1.data.id))
              sessionStorage.setItem('phone',JSON.stringify(this.formData.phone))
            })
            this.$router.push({path: '/home'})
          }
        })
      })
    },
    submitForm3 () {
      this.$refs['登录'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        Axios.get(baseURL + '/admin/login?phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
          if (res.data === '账号错误!' || res.data === '密码错误!') {
            this.$message.error(res.data)
          } else {
            Axios.get(baseURL + '/store/query_phone?phone=' + this.formData.phone).then((res1) =>{
              sessionStorage.setItem('identity', 'admin')
              sessionStorage.setItem('admin', JSON.stringify(res1.data.id))
              sessionStorage.setItem('phone',JSON.stringify(this.formData.phone))
            })
            this.$router.push({path: '/admin'})
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
    showRegister3 () {
      this.addOrUpdateVisible3 = true
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
    },
    showAddOrUpdate3 (data) {
      if (data === 'false') {
        this.addOrUpdateVisible3 = false
      } else {
        this.addOrUpdateVisible3 = true
      }
    }
  }
}

</script>
<style lang="less" src="./login.less" scoped></style>
