<template>
  <el-row>
    <el-tabs type="border-card" style="height: 184px;width:412px;display:inline-block;gutter:3">
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-s-help"></i> Environment</span>
        <span slot="default" style="color: black; font-size: 12px">
          Montezuma's Revenge is a complex reinforcement learning environment with multiple rooms, levels, and obstacles. Agents must master various skills, such as jumping, climbing, and rope-swinging, to progress through the rooms, find keys, and unlock doors.
        </span>
        <el-dropdown>
        <span class="el-dropdown-link" style="color: black; font-size: 12px">
          Environment Selection<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Montezuma's Revenge</el-dropdown-item>
            <el-dropdown-item disabled>Bipedal Walker</el-dropdown-item>
            <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-cpu"></i> Algorithm</span>
        <span slot="default" style="color: black; font-size: 12px">
          H-DQN is a RL algorithm that utilizes a hierarchical architecture to enhance the efficiency and scalability of deep Q-networks. It employs multiple DQNs that operate at different levels of abstraction, allowing it to leverage high-level abstraction and low-level precision for faster and more effective learning.
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-more"></i> System Description</span>
        <span slot="default" style="color: black; font-size: 12px">
          SampleViz is a visual analytics system that enables human-DRL interaction to extract key concepts and improve models. It transforms reward modification and policy debugging into engaging concept exploration, facilitating efficient integration of human expertise and automatic sampling algorithms.
        </span>
      </el-tab-pane>

    </el-tabs>

    <el-card :body-style="{ padding: '0px' }" style="height: 268px;width:412px;display:inline-block;gutter:3">
      <div id="line-view" style="height: 268px;width:412px"></div>
    </el-card>

  </el-row>

</template>

<script>
// 引入基本模板
import * as echarts from 'echarts';

let category = [];
//let dottedBase = +new Date();
//let Reward = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 7, 18, 32, 57, 127, 208, 247, 255, 402, 639, 653, 722, 799];
let Reward = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 7, 18, 32, 57, 127, 208, 247, 255, 402, 639, 653, 722, 799];
let Success_rate = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.18, 0.25, 0.55, 0.56, 0.48, 0.21, 0.84, 0.81, 0.57, 0.49, 0.75, 0.90];
for (let i = 0; i < 25; i++) {
  //let date = new Date((dottedBase += 3600 * 24 * 1000));
  category.push(
      ['Steps', i*230227].join('-')
  );
  //let b = Math.random() * 200;
  //let d = Math.random() * 200;
  //barData.push(b);
  //lineData.push(d + b);
}
//console.log(barData)
//console.log(lineData)


export default {
  name: "line-view",
  data() {
    return {
      option: {
        grid: {
          top: '9%',
          left: '9%',
          right: '9%',
          bottom: '7%'
        },
        backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Reward', 'Success_rate'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: category,
          axisLabel: {
            "show": true,
            "textStyle": {
              "color": "none",
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: [
          {
            //name:'Reward',
            type:'value',
            //splitLine: { show: false },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
            },
          },
          {
            //name:'Success rate',
            type:'value',
            interval: 0.25 ,
            //splitLine: { show: false },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
          }
        ],
        series: [
          {
            name: 'Reward',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
            data: Reward
          },
          {
            name: 'Success_rate',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fdae61' },
                { offset: 1, color: '#abdda4' }
              ])
            },
            yAxisIndex: 1,
            data: Success_rate
          },
        ]
      }
    };
  },
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
      from = newRange[0]
      to = newRange[1]
      //console.log(category,Success_rate,Reward)
      //console.log(Array.isArray(category),Array.isArray(Success_rate),Array.isArray(Reward))
      let newSuccess_rate = Success_rate.slice(from, to);
      let newReward = Reward.slice(from, to);
      let newCategory = category.slice(from, to);
      //console.log(newCategory,newSuccess_rate,newReward)
      this.option.xAxis.data = newCategory;
      this.option.series[0].data = newReward;
      this.option.series[1].data = newSuccess_rate;
      this.chart.setOption(this.option);
    }
  },
  mounted(){
    this.chart = echarts.init(document.getElementById('line-view'))
    this.chart.setOption(this.option)
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>