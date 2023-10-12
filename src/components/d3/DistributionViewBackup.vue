<template>
  <div id="distribution-view" class="container"> </div>
</template>

<script>
  // 引入基本模板
  import * as echarts from 'echarts';
  function renderItem(params, api) {
    const group = {
      type: 'group',
      children: []
    };
    let coordDims = ['x', 'y'];
    for (let baseDimIdx = 0; baseDimIdx < 2; baseDimIdx++) {
      let otherDimIdx = 1 - baseDimIdx;
      let encode = params.encode;
      let baseValue = api.value(encode[coordDims[baseDimIdx]][0]);
      let param = [];
      param[baseDimIdx] = baseValue;
      param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][1]);
      let highPoint = api.coord(param);
      param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][2]);
      let lowPoint = api.coord(param);
      let halfWidth = 3;
      var style = api.style({
        stroke: api.visual('color'),
        fill: undefined
      });
      group.children.push(
          {
            type: 'line',
            transition: ['shape'],
            shape: makeShape(
                baseDimIdx,
                highPoint[baseDimIdx] - halfWidth,
                highPoint[otherDimIdx],
                highPoint[baseDimIdx] + halfWidth,
                highPoint[otherDimIdx]
            ),
            style: style
          },
          {
            type: 'line',
            transition: ['shape'],
            shape: makeShape(
                baseDimIdx,
                highPoint[baseDimIdx],
                highPoint[otherDimIdx],
                lowPoint[baseDimIdx],
                lowPoint[otherDimIdx]
            ),
            style: style
          },
          {
            type: 'line',
            transition: ['shape'],
            shape: makeShape(
                baseDimIdx,
                lowPoint[baseDimIdx] - halfWidth,
                lowPoint[otherDimIdx],
                lowPoint[baseDimIdx] + halfWidth,
                lowPoint[otherDimIdx]
            ),
            style: style
          }
      );
    }
    function makeShape(baseDimIdx, base1, value1, base2, value2) {
      var shape = {};
      shape[coordDims[baseDimIdx] + '1'] = base1;
      shape[coordDims[1 - baseDimIdx] + '1'] = value1;
      shape[coordDims[baseDimIdx] + '2'] = base2;
      shape[coordDims[1 - baseDimIdx] + '2'] = value2;
      return shape;
    }
    return group;
  }
  export default {
    name: "distribution-view",
    mounted(){

      const dimensions = [
        'name', 'y', 'x', 'x min', 'x max', 'y min', 'y max'
      ];
      let subgoal0_data =
      ;
      let subgoal1_data =
      ;
      let subgoal2_data = 
      ;
      let subgoal3_data =
      ;
      let option = {
        title: {
          //text: 'Male and female height and weight distribution',
          //subtext: 'Data from: Heinz 2003'
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '7%',
          containLabel: true
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return (
                  params.seriesName +
                  ' :<br/>' +
                  params.value[0] +
                  //'cm ' +
                  params.value[1] //+
                  //'kg '
              );
            } else {
              return (
                  params.seriesName +
                  ' :<br/>' +
                  params.name +
                  ' : ' +
                  params.value //+
                  //'kg '
              );
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        toolbox: {
          feature: {
            dataZoom: {},
            brush: {
              type: ['rect', 'polygon', 'clear']
            }
          }
        },
        brush: {},
        legend: {
          data: ['Subgoal0', 'Subgoal1'],
          left: 'center',
          bottom: 10
        },
        xAxis: [
          {
            type: 'value',
            position:'top',
            scale: true,
            interval: 5 ,
            min:5, // 起始
            max:80,// 终止
            axisLabel: {
              formatter: '{value} '
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            inverse:true,
            scale: true,
            interval: 5 ,
            min:38, // 起始
            max:72,// 终止
            axisLabel: {
              formatter: '{value} '
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            color: '#d7191c',
            emphasis: {
              focus: 'series'
            },
            // prettier-ignore
            type: 'custom',
            name: 'error',
            renderItem: renderItem,
            dimensions: dimensions,
            encode: {
              x: [2, 3, 4],
              y: [1, 5, 6],
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            data: subgoal0_data,
            z: 100,
          },
          {
            color: '#fdae61',
            emphasis: {
              focus: 'series'
            },
            // prettier-ignore
            type: 'custom',
            name: 'error',
            renderItem: renderItem,
            dimensions: dimensions,
            encode: {
              x: [2, 3, 4],
              y: [1, 5, 6],
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            data: subgoal1_data,
            //z: 100,
          },
          {
            color: '#abdda4',
            emphasis: {
              focus: 'series'
            },
            // prettier-ignore
            type: 'custom',
            name: 'error',
            renderItem: renderItem,
            dimensions: dimensions,
            encode: {
              x: [2, 3, 4],
              y: [1, 5, 6],
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            data: subgoal2_data,
            //z: 100,
          },
          {
            color: '#2b83ba',
            emphasis: {
              focus: 'series'
            },
            // prettier-ignore
            type: 'custom',
            name: 'error',
            renderItem: renderItem,
            dimensions: dimensions,
            encode: {
              x: [2, 3, 4],
              y: [1, 5, 6],
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            data: subgoal3_data,
            //z: 100,
          },
          {
            type: 'scatter',
            name: 'error',
            data: subgoal0_data,
            dimensions: dimensions,
            encode: {
              x: 2,
              y: 1,
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            symbolSize: 6,
            itemStyle: {
              color: '#d7191c'//#8dd3c7
            }
          },
          {
            type: 'scatter',
            name: 'error',
            data: subgoal1_data,
            dimensions: dimensions,
            encode: {
              x: 2,
              y: 1,
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            symbolSize: 6,
            itemStyle: {
              color: '#fdae61'//#8dd3c7
            }
          },
          {
            type: 'scatter',
            name: 'error',
            data: subgoal2_data,
            dimensions: dimensions,
            encode: {
              x: 2,
              y: 1,
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            symbolSize: 6,
            itemStyle: {
              color: '#abdda4'//#8dd3c7
            }
          },
          {
            type: 'scatter',
            name: 'error',
            data: subgoal3_data,
            dimensions: dimensions,
            encode: {
              x: 2,
              y: 1,
              tooltip: [2, 1, 3, 4, 5, 6],
              itemName: 0
            },
            symbolSize: 6,
            itemStyle: {
              color: '#2b83ba'//#8dd3c7
            }
          }

        ]
      }
     //初始化图表
      const chartObj = echarts.init(document.getElementById('distribution-view'))
      chartObj.setOption(option)
    }
  }
</script>
<style scoped>
  .container{width: 100%;height: 100%;}
</style>