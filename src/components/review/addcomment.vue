<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="评论" append-to-body="true">
      <el-form ref="评论" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="评分" prop="score">
          <el-rate v-model="formData.score" :max='5'></el-rate>
        </el-form-item>
        <el-form-item label="评论" prop="comment">
          <el-input v-model="formData.comment" placeholder="请输入评论" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="CommentAdd">确定</el-button>
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
    food1:{
      type: Number,
      default: null
    },
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      nowfood: undefined,
      formData: {
        score: 1,
        comment: undefined,
      },
      showDialog: false,
      rules: {
        score: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        comment: [{
          required: true,
          message: '请输入评论',
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
    console.log('create')
    console.log(this.food1)
    this.nowfood=this.food1
  },
  mounted() {},
  methods: {
    onOpen() {
      /*console.log('open')
      console.log(this.food)*/
    },
    onClose() {
      this.$refs['评论'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['评论'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    handleClose () {
      this.$emit('changeShow', 'false')
    },
    CommentAdd () {
      console.log(this.nowfood)
      this.$refs['评论'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('comment')
        console.log(this.formData.comment)
        console.log(this.formData.score)
        //console.log(this.food1.order_id)
        Axios.get(baseURL+'/comment/insert?food_id='+this.food+'&customer_id='+sessionStorage.getItem('user')+'&comment='+this.formData.comment+'&score='+this.formData.score).then((res) => {
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
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

</style>
