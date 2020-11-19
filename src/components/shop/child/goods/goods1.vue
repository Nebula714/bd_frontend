<style lang="less" src="./goods1.less" scoped></style>
<template>
  <div>
    <div class="goods-menu">
        <el-button type="success" icon="el-icon-plus" @click.native="show">添加菜品</el-button>
        <addmenu :seller="seller" :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></addmenu>
    </div>
    <div class="all">
      <!--<goodsList v-if="tableData.length" :goods="tableData"></goodsList>-->
      <!--<div class="cartcontrol-wrapper">-->
        <!-- 父组件可以在使用子组件的地方直接用 v-on (或@) 来监听子组件触发的事件。 -->
        <!--<cartcontrol @add="addFood" :food="food"></cartcontrol>
      </div>-->
      <ul>
        <li v-for="item in tableData">
            <div class="line-wrapper">
                <div class="logo">
                    <img src="/static/images/slider-pic/slider-pic4.jpeg">
                </div>
                <div class="name">
                    <h3>{{item.name}}</h3>
                </div>
                <div class="price">
                    <span>{{item.price}}</span>
                </div>
            </div>
            <div class="content">
              <div class="description">
                <span>菜品描述 {{item.description}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- 父组件可以在使用子组件的地方直接用 v-on (或@) 来监听子组件触发的事件。 -->
                <cartcontrol @add="addFood" :food="item"></cartcontrol>
              </div>
            </div>
        </li>
    </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
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
import cartcontrol from '../cartcontrol/cartcontrol'
import shopcart from '../shopcart/shopcart'
import goodsList from './goods_list'
export default {
  props: ['seller'],
  data () {
    return {
      tableData: [],
      // 控制新增编辑弹窗的显示与隐藏
      addOrUpdateVisible: false,
      editDialogVisible: false,
      formData: [],
      editid: null
    }
  },
  components: {
    addmenu, cartcontrol, goodsList, shopcart
  },
  // http://10.128.30.77:9090/menu/get_food?store_id=1
  created () {
    console.log('!!!!!')
    console.log(this.seller)
    Axios.get('http://10.136.87.229:9090/menu/get_food?store_id=' + this.seller).then((res) => {
      this.tableData = res.data
      console.log(res.data)
    })
  },
  methods: {
    gettableData () {
      Axios.get('http://10.136.87.229:9090/menu/get_food?store_id=' + this.seller).then((res) => {
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
      Axios.get('http://10.136.87.229:9090/commodity/delete?store_id=' + this.seller + '&food_id=' + foodid).then((res) => {
        console.log(res.data)
        this.gettableData()
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
        Axios.get('http://10.136.87.229:9090/commodity/update?food_id=' + this.editid + '&name=' + this.formData.name + '&description=' + this.formData.description + '&price=' + this.formData.price).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.editDialogVisible = false
        this.gettableData()
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
    },
    _drop (target) {
      // 异步执行下落动画 优化两个动画同时执行的卡顿
      this.$nextTick(() => {
        // 调用子组件shopcart的drop方法
        this.$refs.shopcart.drop(target)
      })
    },
    addFood (target) {
      // 执行小球下落动画
      this._drop(target)
    }
  }
}
</script>
