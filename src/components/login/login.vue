<template>
  <div class="all">
    <div class="class1">
      <el-row :gutter="10" class="class3">
  <el-col :span="6" @click="gotouser">
    <el-card shadow="hover" class="card" @click="gotouser">
      <i class="el-icon-user" @click="gotouser"></i>
      <div class="class2" @click="gotouser">我是用户</div>
    </el-card>
  </el-col>
  <el-col :span="6">
    <el-card shadow="hover" class="card" @click="gotostore">
      <i class="el-icon-user-solid" @click="gotostore"></i>
      <div class="class2" @click="gotostore">我是商家</div>
    </el-card>
  </el-col>
  <el-col :span="6">
    <el-card shadow="hover" class="card" @click="gotoadmin">
      <i class="el-icon-star-off" @click="gotosadmin"></i>
      <div class="class4" @click="gotoadmin">我是管理员</div>
    </el-card>
  </el-col>
</el-row>
    </div>
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
      show:false,
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
  mounted () {
    this.show=true
  },
  methods: {
    gotouser(){
      console.log('click')
      this.$router.push({path: 'userlogin'})
    },
    gotostore(){
      this.$router.push({path: 'storelogin'})
    },
    gotoadmin(){
      this.$router.push({path: 'adminlogin'})
    },
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
