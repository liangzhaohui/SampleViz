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
      let subgoal0_data =[['episode:2485,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2485,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2485,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2485,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2485,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2485,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2485,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2486,subgoal:0,grid:0', 26, 48, '47.20', '48.85', '26.11', '25.14'], ['episode:2486,subgoal:0,grid:2', 46, 58, '57.81', '58.19', '46.20', '45.81'], ['episode:2486,subgoal:0,grid:3', 47, 68, '67.11', '68.85', '47.80', '46.10'], ['episode:2486,subgoal:0,grid:4', 55, 70, '69.20', '70.15', '55.20', '54.87'], ['episode:2486,subgoal:0,grid:4', 55, 70, '69.84', '70.11', '55.18', '54.85'], ['episode:2486,subgoal:0,grid:4', 57, 69, '68.82', '69.16', '57.19', '56.83'], ['episode:2486,subgoal:0,grid:4', 67, 70, '69.80', '70.80', '67.87', '66.80'], ['episode:2487,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2487,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2487,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2487,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2487,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2487,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2487,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2488,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2488,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2488,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2488,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2488,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2488,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2488,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2489,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2489,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2489,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2489,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2489,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2489,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2489,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2490,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2490,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2490,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2490,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2490,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2490,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2490,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2491,subgoal:0,grid:0', 31, 42, '41.89', '42.12', '31.20', '30.89'], ['episode:2491,subgoal:0,grid:2', 49, 58, '57.14', '58.88', '49.12', '48.20'], ['episode:2491,subgoal:0,grid:2', 39, 62, '61.80', '62.88', '39.80', '38.87'], ['episode:2491,subgoal:0,grid:4', 55, 70, '69.10', '70.84', '55.20', '54.11'], ['episode:2491,subgoal:0,grid:4', 55, 70, '69.85', '70.13', '55.20', '54.82'], ['episode:2491,subgoal:0,grid:4', 55, 70, '69.89', '70.87', '55.12', '54.81'], ['episode:2491,subgoal:0,grid:4', 65, 70, '69.80', '70.89', '65.88', '64.89'], ['episode:2492,subgoal:0,grid:1', 42, 50, '49.87', '50.87', '42.20', '41.80'], ['episode:2492,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.80'], ['episode:2492,subgoal:0,grid:4', 56, 67, '66.10', '67.80', '56.85', '55.11'], ['episode:2492,subgoal:0,grid:4', 55, 70, '69.88', '70.19', '55.17', '54.84'], ['episode:2492,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.18', '54.86'], ['episode:2492,subgoal:0,grid:4', 58, 70, '69.80', '70.89', '58.14', '57.13'], ['episode:2493,subgoal:0,grid:1', 42, 50, '49.87', '50.87', '42.20', '41.80'], ['episode:2493,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.80'], ['episode:2493,subgoal:0,grid:4', 56, 67, '66.10', '67.80', '56.85', '55.11'], ['episode:2493,subgoal:0,grid:4', 55, 70, '69.88', '70.19', '55.17', '54.84'], ['episode:2493,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.18', '54.86'], ['episode:2493,subgoal:0,grid:4', 58, 70, '69.80', '70.89', '58.14', '57.13'], ['episode:2494,subgoal:0,grid:0', 35, 51, '50.88', '51.20', '35.12', '34.87'], ['episode:2494,subgoal:0,grid:2', 46, 58, '57.82', '58.16', '46.19', '45.80'], ['episode:2494,subgoal:0,grid:4', 55, 70, '69.80', '70.85', '55.83', '54.14'], ['episode:2494,subgoal:0,grid:4', 55, 70, '69.90', '70.14', '55.15', '54.83'], ['episode:2494,subgoal:0,grid:4', 55, 70, '69.89', '70.89', '55.16', '54.84'], ['episode:2494,subgoal:0,grid:4', 57, 70, '69.80', '70.14', '57.16', '56.85']]

      ;
      let subgoal1_data =[['episode:2485,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2485,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2486,subgoal:1,grid:5', 68, 65, '64.85', '65.18', '68.86', '67.10'], ['episode:2486,subgoal:1,grid:5', 61, 57, '56.87', '57.90', '61.89', '60.17'], ['episode:2487,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2487,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2488,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2488,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2489,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2489,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2490,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2490,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2491,subgoal:1,grid:5', 68, 63, '62.82', '63.16', '68.80', '67.12'], ['episode:2491,subgoal:1,grid:5', 68, 63, '62.14', '63.10', '68.80', '67.18'], ['episode:2492,subgoal:1,grid:4', 68, 67, '66.86', '67.18', '68.80', '67.12'], ['episode:2492,subgoal:1,grid:5', 68, 65, '64.84', '65.14', '68.80', '67.14'], ['episode:2493,subgoal:1,grid:4', 68, 67, '66.86', '67.18', '68.80', '67.12'], ['episode:2493,subgoal:1,grid:5', 68, 65, '64.84', '65.14', '68.80', '67.14'], ['episode:2494,subgoal:1,grid:4', 68, 67, '66.85', '67.20', '68.83', '67.86'], ['episode:2494,subgoal:1,grid:5', 68, 65, '64.83', '65.17', '68.80', '67.12']]

      ;
      let subgoal2_data = [['episode:2484,subgoal:2,grid:0', 35, 41, '40.89', '41.17', '35.13', '34.86'], ['episode:2484,subgoal:2,grid:0', 35, 41, '40.88', '41.20', '35.17', '34.86'], ['episode:2484,subgoal:2,grid:0', 35, 41, '40.89', '41.20', '35.16', '34.82'], ['episode:2484,subgoal:2,grid:1', 41, 42, '41.86', '42.19', '41.16', '40.80'], ['episode:2484,subgoal:2,grid:1', 38, 42, '41.89', '42.20', '38.14', '37.83'], ['episode:2484,subgoal:2,grid:0', 35, 41, '40.90', '41.20', '35.15', '34.82'], ['episode:2485,subgoal:2,grid:5', 65, 53, '52.87', '53.80', '65.12', '64.10'], ['episode:2485,subgoal:2,grid:6', 68, 47, '46.89', '47.80', '68.88', '67.11'], ['episode:2485,subgoal:2,grid:6', 68, 39, '38.81', '39.20', '68.17', '67.86'], ['episode:2485,subgoal:2,grid:6', 68, 47, '46.81', '47.17', '68.13', '67.83'], ['episode:2485,subgoal:2,grid:6', 68, 47, '46.80', '47.17', '68.85', '67.11'], ['episode:2485,subgoal:2,grid:6', 61, 50, '49.12', '50.84', '61.14', '60.89'], ['episode:2485,subgoal:2,grid:5', 68, 52, '51.80', '52.89', '68.17', '67.81'], ['episode:2486,subgoal:2,grid:5', 66, 54, '53.83', '54.13', '66.18', '65.83'], ['episode:2486,subgoal:2,grid:5', 65, 61, '60.89', '61.80', '65.80', '64.89'], ['episode:2486,subgoal:2,grid:5', 61, 53, '52.80', '53.80', '61.90', '60.90'], ['episode:2486,subgoal:2,grid:5', 68, 51, '50.19', '51.89', '68.15', '67.17'], ['episode:2486,subgoal:2,grid:6', 68, 49, '48.81', '49.14', '68.80', '67.11'], ['episode:2486,subgoal:2,grid:6', 66, 41, '40.83', '41.80', '66.14', '65.12'], ['episode:2486,subgoal:2,grid:6', 68, 39, '38.81', '39.16', '68.80', '67.12'], ['episode:2486,subgoal:2,grid:6', 68, 41, '40.85', '41.17', '68.80', '67.87'], ['episode:2486,subgoal:2,grid:6', 68, 39, '38.83', '39.13', '68.80', '67.13'], ['episode:2486,subgoal:2,grid:6', 68, 39, '38.85', '39.13', '68.80', '67.15'], ['episode:2486,subgoal:2,grid:7', 68, 29, '28.80', '29.80', '68.12', '67.15'], ['episode:2486,subgoal:2,grid:7', 68, 27, '26.83', '27.16', '68.80', '67.89'], ['episode:2486,subgoal:2,grid:7', 62, 27, '26.85', '27.18', '62.80', '61.87'], ['episode:2487,subgoal:2,grid:5', 62, 51, '50.88', '51.19', '62.16', '61.15'], ['episode:2487,subgoal:2,grid:6', 63, 49, '48.87', '49.83', '63.84', '62.10'], ['episode:2487,subgoal:2,grid:5', 66, 51, '50.86', '51.80', '66.14', '65.80'], ['episode:2487,subgoal:2,grid:6', 68, 48, '47.12', '48.20', '68.80', '67.16'], ['episode:2487,subgoal:2,grid:6', 68, 47, '46.80', '47.19', '68.90', '67.88'], ['episode:2487,subgoal:2,grid:6', 62, 41, '40.85', '41.86', '62.80', '61.87'], ['episode:2487,subgoal:2,grid:7', 62, 31, '30.88', '31.84', '62.88', '61.16'], ['episode:2487,subgoal:2,grid:7', 65, 24, '23.82', '24.17', '65.80', '64.11'], ['episode:2488,subgoal:2,grid:5', 61, 53, '52.81', '53.84', '61.20', '60.20'], ['episode:2488,subgoal:2,grid:6', 68, 46, '45.81', '46.17', '68.18', '67.80'], ['episode:2488,subgoal:2,grid:5', 65, 63, '62.83', '63.80', '65.10', '64.82'], ['episode:2488,subgoal:2,grid:6', 68, 49, '48.16', '49.20', '68.89', '67.20'], ['episode:2488,subgoal:2,grid:6', 66, 45, '44.81', '45.12', '66.80', '65.13'], ['episode:2489,subgoal:2,grid:5', 61, 51, '50.12', '51.11', '61.14', '60.80'], ['episode:2489,subgoal:2,grid:6', 63, 47, '46.83', '47.13', '63.16', '62.84'], ['episode:2489,subgoal:2,grid:5', 61, 62, '61.90', '62.83', '61.16', '60.84'], ['episode:2489,subgoal:2,grid:5', 68, 52, '51.14', '52.11', '68.88', '67.20'], ['episode:2489,subgoal:2,grid:6', 68, 47, '46.80', '47.16', '68.82', '67.12'], ['episode:2489,subgoal:2,grid:6', 61, 43, '42.80', '43.83', '61.81', '60.88'], ['episode:2489,subgoal:2,grid:7', 68, 27, '26.87', '27.18', '68.80', '67.88'], ['episode:2489,subgoal:2,grid:8', 60, 18, '17.20', '18.82', '60.85', '59.20'], ['episode:2490,subgoal:2,grid:5', 61, 51, '50.88', '51.17', '61.20', '60.85'], ['episode:2490,subgoal:2,grid:6', 68, 45, '44.80', '45.19', '68.18', '67.81'], ['episode:2490,subgoal:2,grid:6', 65, 47, '46.16', '47.90', '65.20', '64.87'], ['episode:2490,subgoal:2,grid:5', 63, 54, '53.14', '54.88', '63.80', '62.18'], ['episode:2490,subgoal:2,grid:6', 66, 44, '43.89', '44.83', '66.80', '65.19'], ['episode:2490,subgoal:2,grid:6', 68, 36, '35.88', '36.14', '68.86', '67.20'], ['episode:2490,subgoal:2,grid:7', 66, 22, '21.20', '22.10', '66.81', '65.17'], ['episode:2491,subgoal:2,grid:5', 62, 53, '52.83', '53.88', '62.88', '61.86'], ['episode:2491,subgoal:2,grid:6', 68, 47, '46.80', '47.18', '68.17', '67.83'], ['episode:2491,subgoal:2,grid:6', 62, 45, '44.13', '45.86', '62.11', '61.87'], ['episode:2491,subgoal:2,grid:6', 68, 49, '48.81', '49.80', '68.11', '67.84'], ['episode:2491,subgoal:2,grid:6', 68, 49, '48.80', '49.16', '68.86', '67.88'], ['episode:2491,subgoal:2,grid:6', 61, 43, '42.80', '43.11', '61.80', '60.87'], ['episode:2491,subgoal:2,grid:7', 69, 27, '26.80', '27.16', '69.80', '68.86'], ['episode:2491,subgoal:2,grid:8', 69, 12, '11.87', '12.80', '69.83', '68.12'], ['episode:2492,subgoal:2,grid:5', 69, 51, '50.84', '51.16', '69.20', '68.82'], ['episode:2492,subgoal:2,grid:6', 69, 49, '48.82', '49.20', '69.14', '68.84'], ['episode:2492,subgoal:2,grid:5', 68, 52, '51.83', '52.87', '68.17', '67.85'], ['episode:2492,subgoal:2,grid:5', 66, 53, '52.89', '53.10', '66.20', '65.13'], ['episode:2492,subgoal:2,grid:6', 68, 49, '48.80', '49.19', '68.13', '67.83'], ['episode:2492,subgoal:2,grid:6', 68, 49, '48.82', '49.13', '68.80', '67.12'], ['episode:2492,subgoal:2,grid:6', 62, 39, '38.17', '39.84', '62.13', '61.90'], ['episode:2492,subgoal:2,grid:6', 68, 39, '38.81', '39.17', '68.80', '67.89'], ['episode:2492,subgoal:2,grid:6', 68, 39, '38.84', '39.16', '68.80', '67.11'], ['episode:2492,subgoal:2,grid:6', 68, 39, '38.84', '39.11', '68.80', '67.13'], ['episode:2492,subgoal:2,grid:6', 68, 39, '38.84', '39.88', '68.80', '67.18'], ['episode:2492,subgoal:2,grid:7', 68, 29, '28.80', '29.18', '68.83', '67.20'], ['episode:2492,subgoal:2,grid:7', 69, 28, '27.82', '28.20', '69.80', '68.11'], ['episode:2493,subgoal:2,grid:5', 69, 51, '50.11', '51.11', '69.20', '68.15'], ['episode:2493,subgoal:2,grid:5', 61, 58, '57.80', '58.80', '61.87', '60.18'], ['episode:2493,subgoal:2,grid:6', 69, 50, '49.84', '50.20', '69.80', '68.14'], ['episode:2493,subgoal:2,grid:5', 69, 52, '51.11', '52.86', '69.17', '68.80'], ['episode:2493,subgoal:2,grid:6', 68, 45, '44.82', '45.18', '68.13', '67.82'], ['episode:2493,subgoal:2,grid:7', 68, 34, '33.86', '34.20', '68.84', '67.20'], ['episode:2493,subgoal:2,grid:7', 61, 34, '33.16', '34.89', '61.80', '60.14'], ['episode:2493,subgoal:2,grid:7', 68, 24, '23.81', '24.18', '68.80', '67.89'], ['episode:2494,subgoal:2,grid:5', 66, 53, '52.14', '53.80', '66.20', '65.14'], ['episode:2494,subgoal:2,grid:5', 68, 56, '55.13', '56.11', '68.80', '67.18'], ['episode:2494,subgoal:2,grid:5', 62, 51, '50.10', '51.80', '62.14', '61.11'], ['episode:2494,subgoal:2,grid:5', 68, 52, '51.89', '52.11', '68.88', '67.80'], ['episode:2494,subgoal:2,grid:5', 68, 51, '50.81', '51.19', '68.13', '67.83'], ['episode:2494,subgoal:2,grid:6', 68, 49, '48.81', '49.90', '68.80', '67.12'], ['episode:2494,subgoal:2,grid:6', 62, 35, '34.85', '35.83', '62.20', '61.20'], ['episode:2494,subgoal:2,grid:7', 63, 24, '23.80', '24.13', '63.80', '62.20']]

      ;
      let subgoal3_data =[['episode:2487,subgoal:3,grid:8', 66, 18, '17.82', '18.88', '66.20', '65.88'], ['episode:2487,subgoal:3,grid:7', 67, 24, '23.84', '24.88', '67.20', '66.89'], ['episode:2487,subgoal:3,grid:7', 68, 29, '28.80', '29.87', '68.15', '67.10'], ['episode:2487,subgoal:3,grid:7', 62, 31, '30.83', '31.87', '62.20', '61.90'], ['episode:2489,subgoal:3,grid:8', 66, 17, '16.80', '17.10', '66.20', '65.87'], ['episode:2489,subgoal:3,grid:8', 64, 11, '10.82', '11.89', '64.20', '63.86'], ['episode:2489,subgoal:3,grid:8', 60, 16, '15.80', '16.90', '60.18', '59.88'], ['episode:2489,subgoal:3,grid:7', 68, 33, '32.82', '33.87', '68.20', '67.86'], ['episode:2489,subgoal:3,grid:7', 65, 21, '20.80', '21.12', '65.19', '64.86'], ['episode:2490,subgoal:3,grid:8', 63, 12, '11.83', '12.89', '63.20', '62.86'], ['episode:2490,subgoal:3,grid:8', 61, 16, '15.81', '16.89', '61.20', '60.87'], ['episode:2490,subgoal:3,grid:8', 55, 12, '11.83', '12.88', '55.20', '54.87'], ['episode:2490,subgoal:3,grid:8', 55, 12, '11.80', '12.90', '55.18', '54.11'], ['episode:2490,subgoal:3,grid:8', 57, 15, '14.83', '15.89', '57.20', '56.88'], ['episode:2490,subgoal:3,grid:8', 58, 12, '11.80', '12.11', '58.17', '57.88'], ['episode:2490,subgoal:3,grid:8', 58, 12, '11.82', '12.86', '58.20', '57.88'], ['episode:2490,subgoal:3,grid:8', 57, 12, '11.80', '12.12', '57.19', '56.89'], ['episode:2490,subgoal:3,grid:9', 53, 12, '11.81', '12.89', '53.20', '52.88'], ['episode:2490,subgoal:3,grid:10', 54, 25, '24.80', '25.89', '54.19', '53.86'], ['episode:2491,subgoal:3,grid:8', 68, 12, '11.82', '12.88', '68.20', '67.88'], ['episode:2491,subgoal:3,grid:8', 62, 19, '18.82', '19.89', '62.20', '61.87'], ['episode:2491,subgoal:3,grid:8', 64, 12, '11.80', '12.11', '64.16', '63.87'], ['episode:2491,subgoal:3,grid:8', 62, 12, '11.80', '12.89', '62.20', '61.89'], ['episode:2491,subgoal:3,grid:8', 61, 14, '13.80', '14.90', '61.18', '60.87'], ['episode:2491,subgoal:3,grid:8', 62, 12, '11.82', '12.87', '62.20', '61.87'], ['episode:2491,subgoal:3,grid:8', 63, 12, '11.80', '12.12', '63.20', '62.87'], ['episode:2491,subgoal:3,grid:8', 64, 12, '11.81', '12.90', '64.20', '63.86'], ['episode:2491,subgoal:3,grid:8', 65, 12, '11.80', '12.88', '65.19', '64.86'], ['episode:2491,subgoal:3,grid:7', 68, 21, '20.80', '21.90', '68.20', '67.87'], ['episode:2491,subgoal:3,grid:7', 68, 21, '20.80', '21.11', '68.20', '67.87'], ['episode:2491,subgoal:3,grid:7', 65, 21, '20.82', '21.88', '65.20', '64.89'], ['episode:2491,subgoal:3,grid:7', 68, 21, '20.80', '21.12', '68.18', '67.86'], ['episode:2491,subgoal:3,grid:7', 69, 31, '30.82', '31.87', '69.20', '68.90'], ['episode:2491,subgoal:3,grid:7', 66, 28, '27.80', '28.89', '66.16', '65.88'], ['episode:2491,subgoal:3,grid:8', 66, 17, '16.83', '17.87', '66.20', '65.10'], ['episode:2491,subgoal:3,grid:8', 66, 14, '13.81', '14.10', '66.20', '65.88'], ['episode:2491,subgoal:3,grid:7', 68, 23, '22.83', '23.89', '68.20', '67.88'], ['episode:2491,subgoal:3,grid:8', 64, 12, '11.80', '12.11', '64.15', '63.87'], ['episode:2491,subgoal:3,grid:8', 64, 12, '11.81', '12.88', '64.20', '63.88'], ['episode:2491,subgoal:3,grid:8', 65, 16, '15.80', '16.11', '65.20', '64.86'], ['episode:2491,subgoal:3,grid:8', 57, 12, '11.82', '12.87', '57.20', '56.89'], ['episode:2491,subgoal:3,grid:8', 57, 12, '11.80', '12.10', '57.19', '56.84'], ['episode:2493,subgoal:3,grid:8', 63, 12, '11.82', '12.10', '63.20', '62.88'], ['episode:2493,subgoal:3,grid:8', 63, 12, '11.84', '12.89', '63.20', '62.89'], ['episode:2493,subgoal:3,grid:8', 61, 12, '11.81', '12.11', '61.20', '60.85'], ['episode:2493,subgoal:3,grid:8', 64, 12, '11.81', '12.10', '64.20', '63.87'], ['episode:2493,subgoal:3,grid:8', 61, 12, '11.80', '12.10', '61.18', '60.87'], ['episode:2493,subgoal:3,grid:8', 62, 12, '11.80', '12.87', '62.19', '61.86'], ['episode:2493,subgoal:3,grid:8', 69, 12, '11.80', '12.88', '69.19', '68.86'], ['episode:2493,subgoal:3,grid:8', 63, 12, '11.80', '12.90', '63.20', '62.87'], ['episode:2493,subgoal:3,grid:8', 69, 14, '13.80', '14.12', '69.20', '68.87'], ['episode:2493,subgoal:3,grid:8', 64, 12, '11.82', '12.89', '64.20', '63.86'], ['episode:2493,subgoal:3,grid:8', 66, 12, '11.82', '12.88', '66.20', '65.89'], ['episode:2493,subgoal:3,grid:8', 65, 12, '11.83', '12.86', '65.20', '64.10'], ['episode:2493,subgoal:3,grid:8', 66, 15, '14.82', '15.89', '66.20', '65.86'], ['episode:2493,subgoal:3,grid:8', 64, 11, '10.81', '11.89', '64.20', '63.87'], ['episode:2493,subgoal:3,grid:8', 61, 11, '10.80', '11.13', '61.19', '60.87'], ['episode:2493,subgoal:3,grid:8', 59, 11, '10.83', '11.84', '59.20', '58.11'], ['episode:2493,subgoal:3,grid:8', 61, 11, '10.81', '11.10', '61.20', '60.85'], ['episode:2493,subgoal:3,grid:8', 62, 11, '10.80', '11.11', '62.18', '61.86'], ['episode:2493,subgoal:3,grid:8', 61, 11, '10.80', '11.12', '61.20', '60.86'], ['episode:2493,subgoal:3,grid:8', 64, 11, '10.80', '11.90', '64.20', '63.84'], ['episode:2493,subgoal:3,grid:8', 66, 15, '14.81', '15.87', '66.20', '65.87'], ['episode:2493,subgoal:3,grid:8', 61, 11, '10.85', '11.88', '61.20', '60.89'], ['episode:2493,subgoal:3,grid:8', 66, 14, '13.82', '14.89', '66.20', '65.86'], ['episode:2493,subgoal:3,grid:8', 64, 11, '10.80', '11.11', '64.19', '63.87'], ['episode:2493,subgoal:3,grid:8', 68, 12, '11.81', '12.12', '68.20', '67.86'], ['episode:2493,subgoal:3,grid:8', 66, 13, '12.83', '13.89', '66.20', '65.89'], ['episode:2493,subgoal:3,grid:8', 62, 19, '18.84', '19.89', '62.20', '61.87'], ['episode:2493,subgoal:3,grid:8', 62, 14, '13.80', '14.12', '62.20', '61.88'], ['episode:2493,subgoal:3,grid:8', 65, 12, '11.82', '12.88', '65.20', '64.86'], ['episode:2493,subgoal:3,grid:8', 62, 16, '15.80', '16.89', '62.18', '61.86'], ['episode:2493,subgoal:3,grid:8', 62, 18, '17.84', '18.11', '62.20', '61.87'], ['episode:2493,subgoal:3,grid:7', 65, 27, '26.86', '27.10', '65.20', '64.89'], ['episode:2493,subgoal:3,grid:6', 65, 37, '36.81', '37.85', '65.20', '64.86'], ['episode:2493,subgoal:3,grid:7', 65, 30, '29.80', '30.89', '65.17', '64.85'], ['episode:2493,subgoal:3,grid:6', 65, 37, '36.80', '37.86', '65.18', '64.88'], ['episode:2494,subgoal:3,grid:8', 63, 18, '17.83', '18.89', '63.20', '62.89'], ['episode:2494,subgoal:3,grid:8', 62, 12, '11.83', '12.87', '62.20', '61.89'], ['episode:2494,subgoal:3,grid:8', 64, 12, '11.80', '12.11', '64.20', '63.85'], ['episode:2494,subgoal:3,grid:8', 62, 12, '11.81', '12.89', '62.20', '61.85'], ['episode:2494,subgoal:3,grid:8', 62, 12, '11.80', '12.12', '62.20', '61.86'], ['episode:2494,subgoal:3,grid:8', 57, 12, '11.81', '12.86', '57.20', '56.89'], ['episode:2494,subgoal:3,grid:8', 61, 12, '11.85', '12.85', '61.20', '60.89'], ['episode:2494,subgoal:3,grid:8', 57, 12, '11.80', '12.90', '57.18', '56.86'], ['episode:2494,subgoal:3,grid:8', 56, 12, '11.82', '12.11', '56.20', '55.10'], ['episode:2494,subgoal:3,grid:9', 54, 12, '11.81', '12.85', '54.20', '53.88'], ['episode:2494,subgoal:3,grid:8', 56, 15, '14.82', '15.87', '56.20', '55.89'], ['episode:2494,subgoal:3,grid:7', 55, 23, '22.85', '23.89', '55.20', '54.12']]

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