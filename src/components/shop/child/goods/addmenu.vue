<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="新增">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="菜名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入菜名" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="formData.price" placeholder="请输入价格" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" placeholder="请输入描述" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <!--<el-button type="primary" @click="handelConfirm">确定</el-button>-->
        <el-button type="primary" @click="MenuAdd">确定</el-button>
        <!--<el-button @click="MenuEdit">编辑</el-button>-->
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
    seller: {
      type: String,
      default: ['seller']
    },
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        name: null,
        description: null,
        price: null
      },
      showDialog: false,
      rules: {
        name: [{
          required: true,
          message: '请输入菜名',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入价格',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入描述',
          trigger: 'blur'
        }]
      }
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
    handleClose () {
      this.$emit('changeShow', 'false')
    },
    MenuAdd () {
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('######')
        console.log(this.seller)
        Axios.get('http://10.128.30.77:9090/commodity/insert?store_id=' + this.seller + '&name=' + this.formData.name + '&description=' + this.formData.description + '&price=' + this.formData.price).then((res) => {
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
