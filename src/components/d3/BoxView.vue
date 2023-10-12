<template>
  <div id="box-view" margin="auto" class="container"> </div>
</template>

<script>
// 引入基本模板
import * as echarts from 'echarts';
// echarts.dataTool = require("echarts/extension-src/dataTool");

let rawData= [
      [210,528,747,171,496,171,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153],
      [0,0,0,0,0,0,2105,0,0,0,2716,1015,276,2152,1326,1178,1353,2091,496,2701,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,0,0,55,1486,2145,496,666,351,1247,2643,1014,2628,78,55,630,1247,528,528,496,496,496,496,496,496,496,496,496,496,496,496,496,496,496,496],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1953,0,0,0,0,946,2820,2038,1916,2278,1029,903,2679,1916,1989,1891,1224,820,1128,1953,1106,990,703],

  //[850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
      //[960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
      //[880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
      //[890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
];
let newData  = rawData
let option = {
  color: ['#d7191c', '#fdae61', '#abdda4', '#2b83ba'],
  dataset: [
    {
      source: rawData
    },
    {
      transform: {
        type: 'boxplot',
        config: {
          itemNameFormatter: function (params) {
            return ' ' + params.value;
          }
        }
      }
    },
    {
      fromDatasetIndex: 1,
      fromTransformResult: 1
    }
  ],

  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '5%',
    left: '10%',
    right: '10%',
    bottom: '7%'
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false,
      lineStyle: {
        width: 1,
        type: 'dotted'    //设置网格线类型 dotted：虚线   solid:实线
      },
    },
    boundaryGap: true,
    splitArea: {
      show: false
    },
    splitLine: {
      show: true
    }
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'dotted'    //设置网格线类型 dotted：虚线   solid:实线
      },
    },
    name: '',
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
  },
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      datasetIndex: 1,
      colorBy: 'data'
    },
    {
      name: 'outlier',
      type: 'scatter',
      color: 'grey',////
      encode: {x: 1, y: 0},
      datasetIndex: 2,
    }
  ]
}
export default {
  name: "box-view",
  props: {
    range: {
      type: Array,
      //default: () => [0, 25]
    }
  },
  watch: {
    range(newRange) {
      let from;
      let to;
      from = 2*newRange[0]
      to = 2*newRange[1]
      let newData = rawData.map(function(item) {
        return item.slice(from, to-1);
      });
      let option = Object.assign({}, this.option, {
        dataset: {
          source: newData
        }
      });
      this.chart.setOption(
        option
      );
    }
  },

  mounted: function () {


    //初始化图表
    this.chart = echarts.init(document.getElementById('box-view'))
    this.chart.setOption(option)
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>