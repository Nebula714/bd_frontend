<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog2" v-on="$listeners" @open="onOpen" @close="onClose" title="商家注册">
      <el-form ref="登录" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="图片链接" prop="photo">
          <el-input v-model="formData.photo" placeholder="请输入图片链接" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="店名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入店名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入地址" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="商家类型" prop="type">
          <el-radio-group v-model="formData.type" size="medium">
            <el-radio v-for="(item, index) in typeOptions" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入电话" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="营业开始时间" prop="business_on">
          <el-time-picker v-model="formData.business_on" format="HH:mm:ss" value-format="HH:mm:ss"
            :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
            placeholder="请选择营业开始时间" clearable></el-time-picker>
        </el-form-item>
        <el-form-item label="营业结束时间" prop="business_off">
          <el-time-picker v-model="formData.business_off" format="HH:mm:ss" value-format="HH:mm:ss"
            :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
            placeholder="请选择营业结束时间" clearable></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="Register2">确定</el-button>
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
    addOrUpdateVisible2: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog2: false,
      formData: {
        photo: undefined,
        name: undefined,
        address: undefined,
        type: undefined,
        phone: undefined,
        password: undefined,
        business_on: null,
        business_off: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入店名',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入地址',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '商家类型不能为空',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          message: '请输入电话',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        business_on: [{
          required: true,
          message: '请选择营业开始时间',
          trigger: 'change'
        }],
        business_off: [{
          required: true,
          message: '请选择营业结束时间',
          trigger: 'change'
        }]
      },
      typeOptions: [{
        'label': '西餐',
        'value': 1
      }, {
        'label': '中餐',
        'value': 2
      }, {
        'label': '饮品',
        'value': 3
      }]
    }
  },
  computed: {},
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible2 (oldVal, newVal) {
      this.showDialog2 = this.addOrUpdateVisible2
    }
  },
  created () {},
  mounted () {},
  methods: {
    onOpen () {},
    onClose () {
      this.$refs['登录'].resetFields()
      this.$emit('changeShow2', 'false')
    },
    close () {
      this.$emit('update:visible', false)
      this.$emit('changeShow2', 'false')
    },
    handelConfirm () {
      this.$refs['登录'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    Register2 () {
      // console.log('&name=' + this.formData.name + '&phone=' + this.formData.phone + '&age=' + this.formData.age + '&gender=' + this.formData.gender + '&password=' + this.formData.password)
      this.$refs['登录'].validate(async valid => {
        if (!valid) return
        // this.close()
        // console.log('register')
        Axios.get(baseURL+'/store/register?name=' + this.formData.name + '&address=' + this.formData.address + '&type=' + this.formData.type + '&phone=' + this.formData.phone + '&business_on=' + this.formData.business_on + '&business_off=' + this.formData.business_off + '&password=' + this.formData.password+'&photo='+encodeURIComponent(this.formData.photo)).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.close()
        // this.$emit('change', null);
      })
    },
    photoBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
  }
}

</script>
<style>
</style>
