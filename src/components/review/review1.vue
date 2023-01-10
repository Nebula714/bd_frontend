<template>
<div>
  <div class="page-order">
      <div class="tour">
        <!--<a @click="goback" class="tour1"><img src="./back.png" style="height: 26px;width: 20px"></a>-->
        <h1 class="title">已完成订单</h1>
        <!--<el-button type="text" class="tour2" @click="open"><i class="btn"></i></el-button>-->
        <!--<a href="javascript:;" class="tour2"><i class="btn"></i></a>-->
      </div>
  <div>
    <el-table :data="selectedGoods" style="width: 100%" :cell-style="changeCellStyle">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!--<el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>-->
            <el-form-item label="">
              <el-table :data="props.row.commodities" style="width: 100%" :show-header="false">
                <el-table-column label="图片">
                  <template slot-scope="scope">
　　　　              <img :src="scope.row.commodity.photo" width="100px" height="100px" class="head_pic"/>
　　              </template>
                </el-table-column>
                <el-table-column
                  prop="commodity.name"
                  label="名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="commodity.price"
                  label="价格"
                  width="180">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.commodity.price}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="数量">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商家名称" prop="store_name" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button
          type="primary" plain size="medium" @click="showCommentDialog(scope.row.order_id)">评价订单</el-button>
        <el-button
          type="success" plain size="medium" @click="showComplaintDialog(scope.row.order_id)">投诉订单</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
  </div>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="commentDialogVisible" v-on="$listeners" @open="onOpen" @close="onClose" title="评价订单">
      <el-form ref="评论" :model="formData1" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="评分" prop="score">
          <el-rate v-model="formData1.score" :max='5'></el-rate>
        </el-form-item>
        <el-form-item label="评论" prop="comment">
          <el-input v-model="formData1.comment" placeholder="请输入评论" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="commentDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="CommentAdd">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-bind="$attrs" :visible.sync="complaintDialogVisible" v-on="$listeners" @open="onOpen" @close="onClose" title="投诉">
      <el-form ref="投诉" :model="formData2" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="投诉内容" prop="content">
          <el-input v-model="formData2.content" placeholder="请输入投诉内容" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="选择管理员" prop="admin">
          <el-radio-group v-model="formData2.admin" size="medium">
            <el-radio v-for="(item,index) in this.adminlist" :key="index" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="complaintDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="ComplaintAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 底部的固定导航栏 -->
  <Footer-nav></Footer-nav>
</div>
</template>

<script>
import FooterNav from '../common/footerNav/footer_nav'
import Axios from 'axios'
import complaint from './complaint'
const baseURL = 'http://10.136.207.156:9090'
export default {
    data(){
        return{
            selectedGoods: [],
            commentDialogVisible: false,
            complaintDialogVisible: false,
            comment_id: null,
            complaint_id: null,
            formData1: [],
            formData2: [],
            adminlist: []
        }
    },
    created() {
      Axios.get(baseURL + '/order/querySO?customer_id=' + sessionStorage.getItem('user')).then((res)=>{
        console.log('review1')
        this.selectedGoods=res.data
        console.log(this.selectedGoods)
      //console.log(this.selectedGoods[0].commodities)
    })
    Axios.get(baseURL+'/admin/query_all').then((res)=>{
      this.adminlist=res.data
      console.log('admin')
      console.log(this.adminlist)
    })
 },
 methods: {
    showCommentDialog(id){
      console.log(id)
      this.comment_id = id
      // this.addOrUpdateVisible = true
      this.commentDialogVisible = true
    },
    showComplaintDialog(id){
      console.log(id)
      this.complaint_id = id
      // this.addOrUpdateVisible = true
      this.complaintDialogVisible = true
    },
    showAddOrUpdate1 (data) {
      if (data === 'false') {
        this.addOrUpdateVisible1 = false
      } else {
        this.addOrUpdateVisible1 = true
      }
    },
    CommentAdd () {
      console.log(this.comment_id)
      this.$refs['评论'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('comment')
        console.log(this.formData1.comment)
        console.log(this.formData1.score)
        //console.log(this.food1.order_id)
        Axios.get(baseURL+'/comment/insert?order_id='+this.comment_id+'&comment='+this.formData1.comment+'&score='+this.formData1.score).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.commentDialogVisible=false
        // this.$emit('change', null);
      })
    },
    ComplaintAdd () {
      this.$refs['投诉'].validate(async valid => {
        if (!valid) return
        // this.close()
        console.log('complaint')
        Axios.get(baseURL+'/complaint/insert?order_id='+this.complaint_id+'&customer_id='+sessionStorage.getItem('user')+'&admin_id='+this.formData2.admin+'&content='+this.formData2.content).then((res) => {
          console.log(res.data)
        })
        /* if (res.meta.status !== 201) {
          console.error('fail')
        } */
        this.complaintDialogVisible=false
        // this.$emit('change', null);
      })
    },
    changeCellStyle (row, column, rowIndex, columnIndex) {
      if(row.column.label === "商家名称"){
        return 'color: orange;font-size:large;font-weight:300'  // 修改的样式
      }else{
        return ''
      }
    }
 },
 components: {
    FooterNav
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .page-order{
    position: absolute;
    width: 94%;
    right: 0;
    height: 75px;
    background-color: blanchedalmond;
  }
  .title{
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
  .name{
    color: rgb(233, 180, 34);
    font-size: 10px;
    font-weight: 700;
  }
</style>
