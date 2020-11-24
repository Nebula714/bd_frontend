<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="注册">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入昵称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formData.age" placeholder="请输入年龄" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender" size="medium">
            <el-radio v-for="(item, index) in genderOptions" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
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
export default {
  inheritAttrs: false,
  components: {},
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog: false,
      formData: {
        name: null,
        age: null,
        gender: null,
        phone: null,
        password: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        age: [{
          required: true,
          message: '请输入年龄',
          trigger: 'blur'
        }],
        gender: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
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
      },
      genderOptions: [{
        'label': '男',
        'value': 1
      }, {
        'label': '女',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible (oldVal, newVal) {
      this.showDialog = this.addOrUpdateVisible
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
    Register () {
      console.log('&name=' + this.formData.name + '&phone=' + this.formData.phone + '&age=' + this.formData.age + '&gender=' + this.formData.gender + '&password=' + this.formData.password)
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('register')
        Axios.get('http://10.136.87.229:9090/user/register?name=' + this.formData.name + '&phone=' + this.formData.phone + '&age=' + this.formData.age + '&gender=' + this.formData.gender + '&password=' + this.formData.password).then((res) => {
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
