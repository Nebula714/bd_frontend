<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="投诉" append-to-body="true">
      <el-form ref="投诉" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="投诉内容" prop="content">
          <el-input v-model="formData.content" placeholder="请输入投诉内容" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="选择管理员" prop="admin">
          <el-radio-group v-model="formData.admin" size="medium">
            <el-radio v-for="(item,index) in this.adminlist" :key="index" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="ComplaintAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
const baseURL ='http://10.136.87.229:9090'
export default {
  inheritAttrs: false,
  components: {},
  props: {
    food2:{
      type: Number,
      default: 1
    },
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      formData: {
        content: undefined,
        admin: undefined
      },
      adminlist: [],
      showDialog: false,
      rules: {
        content: [{
          required: true,
          message: '请输入投诉内容',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible (oldVal, newVal) {
      this.showDialog = this.addOrUpdateVisible
    }
  },
  created() {
    Axios.get(baseURL+'/admin/query_all').then((res)=>{
      this.adminlist=res.data
      console.log('admin')
      console.log(this.adminlist)
    })
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['投诉'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['投诉'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    handleClose () {
      this.$emit('changeShow', 'false')
    },
    ComplaintAdd () {
      this.$refs['投诉'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('complaint')
        console.log(this.food2)
        Axios.get(baseURL+'/complaint/insert?food_id='+this.food+'&customer_id='+sessionStorage.getItem('user')+'&admin_id='+this.formData.admin+'&content='+this.formData.content).then((res) => {
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
