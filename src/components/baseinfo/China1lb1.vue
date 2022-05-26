<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- <a href="/">活动管理</a> -->
        活动管理
        </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- <el-table :data="provinces" stripe style="width: 100%">
      <el-table-column prop="__row_number__" label="序号" width="240"> </el-table-column>
      <el-table-column prop="china1_id" label="id" width="240"> </el-table-column>
      <el-table-column prop="china1_name" label="名字" width="240"> </el-table-column>
      <el-table-column prop="china1_py" label="简称"> </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import {getChina1} from '../../services/china1'
export default {
  data(){
    return {
    }
  },
  created(){
    getChina1();
  },

}
</script>
