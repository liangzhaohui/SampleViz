<template>
    <main>
      <el-row :gutter=3 class='outer'>
        <el-col :span=7 class='overall'>
          <el-row :gutter=3 class='outer' style="height: 464px;">
            <el-col :span=24   style="height: 460px;">
              <div class="grid-content bg-purple-light" ><!-- Attributes -->
                <line-view :range="range"></line-view>
              </div>
            </el-col>
          </el-row>
          <el-row :span=14 :gutter=3 style="height: 434px;">
            <div class="grid-content bg-purple-light" ><!--  -->
              <grid-view :cood="cood" :value="range" @change="handleSlideChange" ></grid-view>
            </div>
          </el-row>
        </el-col>
        <el-col :gutter=3 :span=17 class='overall' style="height: 900px;">
          <el-row  :gutter=3 class='outer' style="height: 80px;">
            <el-col width="100%" style="height: 60px;">
              <top-bar style="height: 60px;"></top-bar>
            </el-col>
          </el-row>
          <el-row :gutter=3 style="height: 565px;">
            <el-col :gutter=3 :span=18 class="outer" style="height: 562px;">
              <div class="grid-content bg-purple-light">
                <distribution-view style="height: 565px;" :range="range" @coodChanged="onCoodChanged" :cood="cood"></distribution-view>
              </div>
            </el-col>
            <el-col :gutter=3 :span=6 class="outer" style="height: 562px;">
              <div class="grid-content bg-purple-light">
                <box-view style="display:inline-block; height: 560px;" :range="range"></box-view>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter=3 style="height: 253px;">
            <el-col :gutter=3 :span=24 class="outer" style="height: 253px;">
              <div class="grid-content bg-purple-light">
                <flow-view style="height: 253px;" :range="range"></flow-view>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </main>
</template>

<script>
import TopBar from '../components/d3/TopBar'
import ExpConfiguration from '../components/d3/ExpConfiguration'
import DataConfiguration from '../components/d3/DataConfiguration'
import DistributionView from '../components/d3/DistributionView'
import GridView from '../components/d3/GridView'
import FlowView from '../components/d3/InstanceFlow/InstanceFlowView'
import BoxView from '../components/d3/BoxView.vue'
import LineView from '../components/d3/LineView.vue'

import StuTable from '../components/StuTable'
import TitleBar from '../components/TitleBar'

export default {
    data() {
      return {
        range:[0,25],
        cood: [0, 0, 0, 0]
      }
    },
    components: {
      'top-bar':TopBar,
      'exp-configuration':ExpConfiguration,
      'data-configuration':DataConfiguration,
      'distribution-view':DistributionView,
      'grid-view':GridView,
      'flow-view':FlowView,
      'box-view':BoxView,
      'line-view':LineView,

        'stu-table': StuTable,
        'title-bar': TitleBar,

    },
    methods: {
      handleSlideChange(value) {
        this.range = value
        console.log(this.range)
      },
      onCoodChanged(cood) {
        this.cood = [cood[0],cood[1],cood[2],cood[3]]; // 更新 cood 的值
        console.log('Cood changed:', cood);
      }
    },
    watch: {
      
    }

}
</script>

<style>
  body {
      padding: 0px;
      margin: 0px;
      background-color: #e5e9f2;
  }

  main {
      padding: 3px 5px 0 5px;
      min-width: 1420px;
  }

  .el-row.topnavi {
    margin-bottom: 1px;
    /* height: 300px; */
  }

  .overall {
    height: 700px;
    /* overflow: auto; */
  }
  .detail {
    height: 708px;
    overflow: auto;
    -ms-overflow-style: none;    
    overflow: -moz-scrollbars-none; 
  }
  .detail::-webkit-scrollbar { width: 0 !important }

  /* .el-row:last-child {
    margin-bottom: 0;
  } */
  .el-col {
    border-radius: 2px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 2px;
    height: 100%;
    width: 100%;
  }
  .newgrid-content {
    border-radius: 2px;
    height: 100%;
    width: 50%;
  }
  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }
</style>