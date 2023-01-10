<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog3" v-on="$listeners" @open="onOpen" @close="onClose" title="管理员注册">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入昵称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" clearable
            prefix-icon='el-icon-phone-outline' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请设置密码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="Register">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
const baseURL = 'http://10.136.207.156:9090'
export default {
  inheritAttrs: false,
  components: {},
  props: {
    addOrUpdateVisible3: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog3: false,
      formData: {
        name: null,
        phone: null,
        password: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请设置密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible3 (oldVal, newVal) {
      this.showDialog3 = this.addOrUpdateVisible3
    }
  },
  created () {},
  mounted () {},
  methods: {
    onOpen () {},
    onClose () {
      this.$refs['elForm'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close () {
      this.$emit('update:visible', false)
      this.$emit('changeShow', 'false')
    },
    handelConfirm () {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    Register3 () {
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('register3')
        Axios.get(baseURL+'/admin/register?name=' + this.formData.name + '&phone=' + this.formData.phone + '&password=' + this.formData.password).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.close()
        // this.$emit('change', null);
      })
    }
  }
}

</script>
<style>
</style>
