<template>
  <div>
    <div>
        <el-button type="success" icon="el-icon-plus" @click.native="show">添加菜品</el-button>
        <addmenu :seller="seller" :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></addmenu>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="id"
            label="id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="180">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="180">
          </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <!--<el-button
              size="mini"
              @click="showEditDialog(scope.row.id)">编辑</el-button>-->
              <el-button
              size="mini"
              @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-bind="$attrs" :visible.sync="editDialogVisible" v-on="$listeners" @open="onOpen" @close="onClose" title="修改">
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
        <el-button @click="editDialogVisible = false">取消</el-button>
        <!--<el-button type="primary" @click="handelConfirm">确定</el-button>-->
        <el-button type="primary" @click="MenuEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
import addmenu from './addmenu'
const baseURL = 'http://10.136.207.156:9090'
export default {
  props: ['seller'],
  data () {
    return {
      tableData: [],
      // 控制新增编辑弹窗的显示与隐藏
      addOrUpdateVisible: false,
      editDialogVisible: false,
      formData: [],
      editid: null,
      inject: ['reload']
    }
  },
  components: {
    addmenu
  },
  created () {
    console.log('!!!!!')
    console.log(this.seller)
    Axios.get(baseURL+'/menu/get_food?store_id=' + this.seller).then((res) => {
      this.tableData = res.data
      console.log(res.data)
    })
  },
  methods: {
    gettableData () {
      Axios.get(baseURL+'/menu/get_food?store_id=' + this.seller).then((res) => {
        this.tableData = []
        this.tableData = res.data
        console.log(res.data)
        console.log('success')
      })
    },
    handleDelete (foodid) {
      console.log('((((')
      console.log(this.seller)
      console.log(foodid)
      Axios.get(baseURL+'/commodity/delete?store_id=' + this.seller + '&food_id=' + foodid).then((res) => {
        console.log(res.data)
      })
    },
    showEditDialog (id) {
      console.log(id)
      this.editid = id
      // this.addOrUpdateVisible = true
      this.editDialogVisible = true
    },
    MenuEdit () {
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('######')
        console.log(this.editid)
        Axios.get(baseURL+'/commodity/update?food_id=' + this.editid + '&name=' + this.formData.name + '&description=' + this.formData.description + '&price=' + this.formData.price).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.editDialogVisible = false
        // this.gettableData()
      })
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    show () {
      this.addOrUpdateVisible = true
      // console.log('show')
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate (data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    }
  }
}
</script>

