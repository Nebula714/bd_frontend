<template>
    <div>
        <div class="page-admin">
            <div class="tour">
            <!--<a @click="goback" class="tour1"><img src="./back.png" style="height: 26px;width: 20px"></a>-->
            <h1 class="title">我的投诉</h1>
            <!--<el-button type="text" class="tour2" @click="open"><i class="btn"></i></el-button>-->
            <!--<a href="javascript:;" class="tour2"><i class="btn"></i></a>-->
            </div>
        </div>
        <div class="table" font-size="large">
            <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column prop="customer_name" label="投诉人" sortable width="180">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        @show="cust_info(scope.row.customer_id)"
                        :content="getcust()">
                        <el-link slot="reference">{{scope.row.customer_name}}</el-link>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="store_name" label="投诉商家" width="180">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        @show="store_info(scope.row.store_id)"
                        :content="getstore()">
                        <el-link slot="reference" @click="gotostore(scope.row.store_id)">{{scope.row.store_name}}</el-link>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="content"
                label="投诉内容"
                width="500"
                align="center">
            </el-table-column>
            <el-table-column
                prop="state"
                label="投诉状态"
                width="150"
                sortable
                :filters="[{ text: '未解决', value: 0 }, { text: '已解决', value: 1 }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                <el-tag
                    :type="scope.row.state === 0 ? 'primary' : 'success'"
                    disable-transitions >{{gets(scope.row.state)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="state" label="操作">
                <template slot-scope="scope">
                    <el-switch
                        active-color="#13ce66"
                        inactive-color="#FF9933"
                        v-model="scope.row.state"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeSwitch(scope.row.customer_id,scope.row.order_id)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <!--<el-button @click="clearFilter">清除所有过滤器</el-button>-->
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
const baseURL = 'http://10.136.207.156:9090'
export default {
    inject:['reload'],
    data(){
        return{
            tableData: [],
            customer: [],
            cust: null,
            store: [],
            st:null
        }
    },
    created(){
        console.log('admin')
        console.log(sessionStorage.getItem('admin'))
        Axios.get(baseURL + '/admin/query_complaints?admin_id=' + sessionStorage.getItem('admin')).then((res)=>{
        this.tableData=res.data
        console.log(this.tableData)
      //console.log(this.selectedGoods[0].commodities)
        })
    },
    methods: {
        cust_info(id){
            console.log(id)
            Axios.get(baseURL + '/user/query_id?id='+ id).then((res)=>{
                this.customer=res.data
                console.log(this.customer.phone)
                this.cust=this.customer.phone
                console.log(this.cust)
                return this.customer.phone
            })
        },
        getcust(){
            return '联系方式:'+this.cust
        },
        store_info(id){
            console.log(id)
            Axios.get(baseURL + '/store/query_id?id='+ id).then((res)=>{
                this.store=res.data
                this.st=this.store.phone
                return this.store.phone
            })
        },
        getstore(){
            return '联系方式:'+this.st
        },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
          console.log(row.state)
          console.log(value)
        return row.state === value;
      },
      gets(state){
          if(state===0){
              return '未解决'
          }
          else{
              return '已解决'
          }
      },
      changeSwitch(customer_id,order_id){
        Axios.get(baseURL + '/admin/handle?customer_id='+ customer_id +'&admin_id=' + sessionStorage.getItem('admin')+'&order_id='+ order_id).then((res)=>{
      //console.log(this.selectedGoods[0].commodities)
            this.reload()
        })
      },
       gotostore(id){
      this.$router.push({path: 'myshop', query: {para: id}})
    },
    }
}
</script>

<style scoped>
.page-admin{
    position: absolute;
    width: 100%;
    right: 0;
    height: 75px;
    background-color: blanchedalmond;
  }
  .title{
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
  .table{
      position: absolute;
      top: 10%;
      width:100%;
  }
</style>