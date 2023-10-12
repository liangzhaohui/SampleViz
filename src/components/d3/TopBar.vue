<template>
  <el-row :gutter=0 width="50%" height ="80px">
    <el-col :body-style="{ padding: '10px' }" :span=15><div class="grid-content bg-purple">

    </div></el-col>
    <el-col :span=7><div class="grid-content bg-purple" style="font-size:41px;color:#FFFFFF;font-style:oblique;line-height: 76px;vertical-align:middle">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSample</div></el-col>
    <el-col :span=2><div class="grid-content bg-purple" style="font-size:41px;color:#E6A23C;font-style:normal;line-height: 76px;vertical-align:middle">Viz</div></el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #484848;
  }
  .bg-purple-light {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 1px;
    min-height: 76px;
  }
  .row-bg {
    padding: 2px 0;
    background-color: #f9fafc;
  }
</style>
 
