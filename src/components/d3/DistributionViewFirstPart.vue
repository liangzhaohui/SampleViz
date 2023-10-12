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
      let subgoal0_data = [['episode:2304,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2304,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2304,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2304,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2304,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2304,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2304,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2305,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.90'], ['episode:2305,subgoal:0,grid:2', 45, 55, '54.82', '55.80', '45.90', '44.16'], ['episode:2305,subgoal:0,grid:2', 43, 58, '57.81', '58.17', '43.20', '42.81'], ['episode:2305,subgoal:0,grid:4', 55, 70, '69.85', '70.86', '55.13', '54.83'], ['episode:2305,subgoal:0,grid:4', 55, 70, '69.86', '70.15', '55.13', '54.90'], ['episode:2305,subgoal:0,grid:4', 55, 70, '69.86', '70.13', '55.14', '54.83'], ['episode:2305,subgoal:0,grid:4', 62, 70, '69.80', '70.11', '62.90', '61.85'], ['episode:2306,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '39.20', '38.90'], ['episode:2306,subgoal:0,grid:2', 47, 56, '55.20', '56.85', '47.16', '46.81'], ['episode:2306,subgoal:0,grid:2', 44, 56, '55.80', '56.13', '44.17', '43.86'], ['episode:2306,subgoal:0,grid:4', 56, 67, '66.86', '67.90', '56.20', '55.86'], ['episode:2306,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.80'], ['episode:2306,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.83'], ['episode:2306,subgoal:0,grid:4', 63, 70, '69.80', '70.11', '63.86', '62.89'], ['episode:2307,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.89'], ['episode:2307,subgoal:0,grid:2', 40, 53, '52.83', '53.80', '40.87', '39.90'], ['episode:2307,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.80'], ['episode:2307,subgoal:0,grid:4', 55, 70, '69.81', '70.87', '55.11', '54.11'], ['episode:2307,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '55.20', '54.87'], ['episode:2307,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.82'], ['episode:2307,subgoal:0,grid:4', 61, 68, '67.80', '68.14', '61.15', '60.86'], ['episode:2308,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.89'], ['episode:2308,subgoal:0,grid:2', 40, 53, '52.83', '53.80', '40.87', '39.90'], ['episode:2308,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.80'], ['episode:2308,subgoal:0,grid:4', 55, 70, '69.81', '70.87', '55.11', '54.11'], ['episode:2308,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '55.20', '54.87'], ['episode:2308,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.82'], ['episode:2308,subgoal:0,grid:4', 61, 68, '67.80', '68.14', '61.15', '60.86'], ['episode:2309,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2309,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2309,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2309,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2309,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2309,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2309,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2310,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.90'], ['episode:2310,subgoal:0,grid:2', 45, 55, '54.82', '55.80', '45.90', '44.16'], ['episode:2310,subgoal:0,grid:2', 43, 58, '57.81', '58.17', '43.20', '42.81'], ['episode:2310,subgoal:0,grid:4', 55, 70, '69.85', '70.86', '55.13', '54.83'], ['episode:2310,subgoal:0,grid:4', 55, 70, '69.86', '70.15', '55.13', '54.90'], ['episode:2310,subgoal:0,grid:4', 55, 70, '69.86', '70.13', '55.14', '54.83'], ['episode:2310,subgoal:0,grid:4', 62, 70, '69.80', '70.11', '62.90', '61.85']]
      ;
      let subgoal1_data = [['episode:2304,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2304,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2305,subgoal:1,grid:5', 68, 65, '64.87', '65.11', '68.80', '67.14'], ['episode:2305,subgoal:1,grid:5', 68, 65, '64.85', '65.15', '68.80', '67.14'], ['episode:2306,subgoal:1,grid:5', 68, 65, '64.84', '65.16', '68.80', '67.13'], ['episode:2306,subgoal:1,grid:5', 68, 63, '62.83', '63.20', '68.83', '67.87'], ['episode:2307,subgoal:1,grid:5', 67, 65, '64.84', '65.20', '67.80', '66.10'], ['episode:2307,subgoal:1,grid:5', 68, 65, '64.83', '65.18', '68.80', '67.11'], ['episode:2308,subgoal:1,grid:5', 67, 65, '64.84', '65.20', '67.80', '66.10'], ['episode:2308,subgoal:1,grid:5', 68, 65, '64.83', '65.18', '68.80', '67.11'], ['episode:2309,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2309,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2310,subgoal:1,grid:5', 68, 65, '64.87', '65.11', '68.80', '67.14'], ['episode:2310,subgoal:1,grid:5', 68, 65, '64.85', '65.15', '68.80', '67.14']]
      ;
      let subgoal2_data = [['episode:2303,subgoal:2,grid:4', 65, 67, '66.87', '67.87', '65.85', '64.86'], ['episode:2303,subgoal:2,grid:4', 64, 70, '69.13', '70.17', '64.80', '63.16'], ['episode:2303,subgoal:2,grid:4', 63, 68, '67.14', '68.12', '63.82', '62.20'], ['episode:2303,subgoal:2,grid:5', 65, 58, '57.81', '58.16', '65.18', '64.83'], ['episode:2303,subgoal:2,grid:4', 62, 67, '66.19', '67.81', '62.85', '61.13'], ['episode:2303,subgoal:2,grid:4', 62, 66, '65.84', '66.87', '62.20', '61.11'], ['episode:2303,subgoal:2,grid:4', 62, 68, '67.12', '68.89', '62.14', '61.80'], ['episode:2303,subgoal:2,grid:4', 60, 70, '69.20', '70.89', '60.80', '59.85'], ['episode:2303,subgoal:2,grid:4', 57, 70, '69.20', '70.20', '57.16', '56.11'], ['episode:2303,subgoal:2,grid:4', 55, 70, '69.16', '70.20', '55.11', '54.15'], ['episode:2303,subgoal:2,grid:3', 54, 70, '69.13', '70.20', '54.19', '53.85'], ['episode:2303,subgoal:2,grid:4', 56, 67, '66.12', '67.20', '56.15', '55.86'], ['episode:2303,subgoal:2,grid:3', 54, 70, '69.12', '70.16', '54.20', '53.89'], ['episode:2303,subgoal:2,grid:3', 54, 70, '69.12', '70.20', '54.16', '53.89'], ['episode:2303,subgoal:2,grid:4', 56, 70, '69.90', '70.13', '56.89', '55.12'], ['episode:2303,subgoal:2,grid:4', 56, 70, '69.87', '70.10', '56.10', '55.86'], ['episode:2303,subgoal:2,grid:4', 57, 70, '69.10', '70.15', '57.12', '56.87'], ['episode:2303,subgoal:2,grid:4', 60, 70, '69.80', '70.88', '60.89', '59.90'], ['episode:2303,subgoal:2,grid:4', 62, 69, '68.86', '69.19', '62.20', '61.11'], ['episode:2303,subgoal:2,grid:4', 64, 70, '69.81', '70.13', '64.12', '63.86'], ['episode:2303,subgoal:2,grid:4', 59, 70, '69.13', '70.13', '59.83', '58.86'], ['episode:2303,subgoal:2,grid:4', 59, 70, '69.17', '70.12', '59.86', '58.81'], ['episode:2303,subgoal:2,grid:4', 57, 70, '69.16', '70.87', '57.14', '56.80'], ['episode:2303,subgoal:2,grid:4', 57, 70, '69.20', '70.20', '57.90', '56.80'], ['episode:2303,subgoal:2,grid:4', 59, 70, '69.89', '70.13', '59.16', '58.80'], ['episode:2303,subgoal:2,grid:4', 61, 67, '66.89', '67.17', '61.80', '60.80'], ['episode:2303,subgoal:2,grid:4', 58, 68, '67.11', '68.11', '58.90', '57.80'], ['episode:2303,subgoal:2,grid:4', 56, 70, '69.86', '70.13', '56.12', '55.84'], ['episode:2304,subgoal:2,grid:5', 65, 59, '58.89', '59.86', '65.84', '64.17'], ['episode:2304,subgoal:2,grid:5', 68, 51, '50.82', '51.17', '68.12', '67.90'], ['episode:2304,subgoal:2,grid:6', 68, 45, '44.81', '45.19', '68.16', '67.85'], ['episode:2304,subgoal:2,grid:6', 68, 43, '42.85', '43.12', '68.16', '67.80'], ['episode:2304,subgoal:2,grid:5', 66, 54, '53.81', '54.13', '66.20', '65.90'], ['episode:2304,subgoal:2,grid:5', 68, 63, '62.82', '63.19', '68.17', '67.82'], ['episode:2304,subgoal:2,grid:4', 65, 69, '68.82', '69.84', '65.14', '64.80'], ['episode:2304,subgoal:2,grid:4', 60, 70, '69.20', '70.20', '60.19', '59.81'], ['episode:2304,subgoal:2,grid:4', 68, 68, '67.83', '68.11', '68.88', '67.80'], ['episode:2304,subgoal:2,grid:5', 67, 58, '57.85', '58.20', '67.18', '66.87'], ['episode:2304,subgoal:2,grid:5', 65, 64, '63.10', '64.13', '65.14', '64.89'], ['episode:2304,subgoal:2,grid:5', 62, 62, '61.12', '62.89', '62.84', '61.83'], ['episode:2304,subgoal:2,grid:4', 64, 71, '70.13', '71.80', '64.16', '63.80'], ['episode:2304,subgoal:2,grid:4', 64, 71, '70.15', '71.83', '64.20', '63.88'], ['episode:2304,subgoal:2,grid:4', 64, 71, '70.86', '71.12', '64.12', '63.14'], ['episode:2304,subgoal:2,grid:4', 68, 71, '70.80', '71.13', '68.15', '67.10'], ['episode:2304,subgoal:2,grid:5', 66, 59, '58.89', '59.80', '66.88', '65.86'], ['episode:2305,subgoal:2,grid:5', 69, 57, '56.81', '57.16', '69.20', '68.84'], ['episode:2305,subgoal:2,grid:4', 64, 70, '69.18', '70.84', '64.82', '63.12'], ['episode:2305,subgoal:2,grid:5', 64, 65, '64.17', '65.80', '64.11', '63.85'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.87', '70.88', '61.12', '60.88'], ['episode:2305,subgoal:2,grid:5', 63, 64, '63.89', '64.14', '63.83', '62.16'], ['episode:2305,subgoal:2,grid:4', 56, 70, '69.80', '70.85', '56.19', '55.83'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.80', '70.17', '63.15', '62.82'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.83', '70.12', '61.11', '60.86'], ['episode:2305,subgoal:2,grid:4', 67, 69, '68.80', '69.14', '67.15', '66.83'], ['episode:2305,subgoal:2,grid:4', 67, 71, '70.80', '71.90', '67.89', '66.13'], ['episode:2305,subgoal:2,grid:4', 68, 71, '70.80', '71.89', '68.11', '67.10'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.80', '70.84', '61.88', '60.19'], ['episode:2305,subgoal:2,grid:4', 57, 70, '69.89', '70.80', '57.83', '56.86'], ['episode:2305,subgoal:2,grid:3', 53, 70, '69.12', '70.84', '53.85', '52.80'], ['episode:2305,subgoal:2,grid:3', 53, 70, '69.18', '70.88', '53.81', '52.13'], ['episode:2305,subgoal:2,grid:4', 59, 70, '69.80', '70.85', '59.19', '58.13'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.85', '70.80', '61.14', '60.11'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.85', '70.84', '63.19', '62.84'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.85', '70.82', '63.13', '62.86'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.89', '70.82', '63.89', '62.10'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.11', '70.86', '63.12', '62.11'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.20', '70.12', '61.90', '60.15'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.20', '70.84', '61.19', '60.90'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.20', '70.85', '61.89', '60.18'], ['episode:2305,subgoal:2,grid:4', 63, 70, '69.89', '70.90', '63.20', '62.20'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.14', '70.11', '61.15', '60.20'], ['episode:2305,subgoal:2,grid:4', 63, 68, '67.81', '68.88', '63.20', '62.86'], ['episode:2305,subgoal:2,grid:4', 64, 70, '69.80', '70.82', '64.83', '63.85'], ['episode:2305,subgoal:2,grid:4', 62, 70, '69.80', '70.14', '62.16', '61.80'], ['episode:2305,subgoal:2,grid:4', 62, 70, '69.81', '70.13', '62.89', '61.80'], ['episode:2305,subgoal:2,grid:5', 62, 61, '60.17', '61.80', '62.90', '61.85'], ['episode:2305,subgoal:2,grid:4', 69, 70, '69.81', '70.17', '69.16', '68.80'], ['episode:2305,subgoal:2,grid:5', 62, 64, '63.80', '64.12', '62.12', '61.11'], ['episode:2305,subgoal:2,grid:4', 69, 67, '66.12', '67.20', '69.88', '68.81'], ['episode:2305,subgoal:2,grid:4', 69, 70, '69.82', '70.15', '69.12', '68.80'], ['episode:2305,subgoal:2,grid:4', 66, 69, '68.80', '69.12', '66.80', '65.88'], ['episode:2305,subgoal:2,grid:4', 66, 70, '69.80', '70.10', '66.80', '65.81'], ['episode:2305,subgoal:2,grid:4', 65, 69, '68.13', '69.20', '65.80', '64.10'], ['episode:2305,subgoal:2,grid:4', 66, 68, '67.13', '68.13', '66.11', '65.80'], ['episode:2305,subgoal:2,grid:4', 62, 70, '69.80', '70.19', '62.17', '61.83'], ['episode:2305,subgoal:2,grid:4', 68, 69, '68.14', '69.20', '68.20', '67.88'], ['episode:2305,subgoal:2,grid:4', 60, 70, '69.81', '70.18', '60.15', '59.87'], ['episode:2305,subgoal:2,grid:4', 63, 66, '65.20', '66.16', '63.86', '62.14'], ['episode:2305,subgoal:2,grid:5', 64, 65, '64.18', '65.85', '64.11', '63.17'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.80', '70.85', '61.16', '60.20'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.85', '70.12', '61.16', '60.20'], ['episode:2305,subgoal:2,grid:4', 59, 70, '69.90', '70.20', '59.16', '58.19'], ['episode:2305,subgoal:2,grid:4', 59, 70, '69.12', '70.20', '59.83', '58.15'], ['episode:2305,subgoal:2,grid:4', 61, 70, '69.82', '70.20', '61.17', '60.84'], ['episode:2305,subgoal:2,grid:4', 67, 70, '69.81', '70.15', '67.20', '66.81'], ['episode:2306,subgoal:2,grid:5', 68, 57, '56.87', '57.17', '68.14', '67.12'], ['episode:2306,subgoal:2,grid:5', 68, 61, '60.84', '61.11', '68.17', '67.85'], ['episode:2306,subgoal:2,grid:5', 68, 63, '62.86', '63.80', '68.13', '67.90'], ['episode:2306,subgoal:2,grid:5', 67, 52, '51.82', '52.16', '67.17', '66.84'], ['episode:2306,subgoal:2,grid:4', 68, 66, '65.88', '66.13', '68.19', '67.13'], ['episode:2306,subgoal:2,grid:4', 61, 70, '69.17', '70.90', '61.88', '60.20'], ['episode:2306,subgoal:2,grid:4', 59, 70, '69.13', '70.15', '59.83', '58.20'], ['episode:2306,subgoal:2,grid:4', 55, 68, '67.84', '68.15', '55.15', '54.87'], ['episode:2306,subgoal:2,grid:2', 53, 58, '57.20', '58.16', '53.16', '52.87'], ['episode:2306,subgoal:2,grid:2', 49, 58, '57.87', '58.80', '49.85', '48.86'], ['episode:2306,subgoal:2,grid:1', 41, 48, '47.87', '48.16', '41.84', '40.85'], ['episode:2306,subgoal:2,grid:10', 50, 33, '32.89', '33.80', '50.12', '49.80'], ['episode:2306,subgoal:2,grid:1', 50, 36, '35.11', '36.80', '50.90', '49.80'], ['episode:2306,subgoal:2,grid:1', 50, 38, '37.80', '38.17', '50.80', '49.83'], ['episode:2306,subgoal:2,grid:10', 43, 34, '33.20', '34.20', '43.10', '42.87'], ['episode:2307,subgoal:2,grid:5', 68, 54, '53.81', '54.19', '68.20', '67.81'], ['episode:2307,subgoal:2,grid:5', 68, 54, '53.80', '54.85', '68.11', '67.20'], ['episode:2307,subgoal:2,grid:5', 68, 51, '50.82', '51.90', '68.11', '67.20'], ['episode:2307,subgoal:2,grid:5', 68, 59, '58.80', '59.12', '68.86', '67.89'], ['episode:2307,subgoal:2,grid:5', 68, 58, '57.80', '58.16', '68.13', '67.86'], ['episode:2307,subgoal:2,grid:5', 68, 61, '60.86', '61.15', '68.18', '67.85'], ['episode:2307,subgoal:2,grid:5', 68, 59, '58.82', '59.20', '68.19', '67.81'], ['episode:2307,subgoal:2,grid:4', 61, 67, '66.81', '67.16', '61.20', '60.82'], ['episode:2307,subgoal:2,grid:4', 67, 68, '67.18', '68.20', '67.80', '66.14'], ['episode:2307,subgoal:2,grid:5', 61, 62, '61.20', '62.89', '61.20', '60.90'], ['episode:2307,subgoal:2,grid:5', 61, 57, '56.18', '57.20', '61.16', '60.17'], ['episode:2307,subgoal:2,grid:5', 68, 57, '56.83', '57.15', '68.13', '67.85'], ['episode:2307,subgoal:2,grid:6', 65, 45, '44.88', '45.84', '65.19', '64.17'], ['episode:2308,subgoal:2,grid:5', 68, 53, '52.80', '53.20', '68.19', '67.80'], ['episode:2308,subgoal:2,grid:5', 62, 57, '56.86', '57.20', '62.80', '61.19'], ['episode:2308,subgoal:2,grid:5', 62, 52, '51.88', '52.85', '62.86', '61.20'], ['episode:2308,subgoal:2,grid:6', 62, 45, '44.19', '45.81', '62.87', '61.80'], ['episode:2308,subgoal:2,grid:6', 66, 45, '44.83', '45.15', '66.18', '65.80'], ['episode:2309,subgoal:2,grid:5', 61, 56, '55.88', '56.13', '61.80', '60.15'], ['episode:2309,subgoal:2,grid:6', 66, 50, '49.13', '50.11', '66.80', '65.89'], ['episode:2309,subgoal:2,grid:5', 68, 51, '50.84', '51.17', '68.17', '67.83'], ['episode:2309,subgoal:2,grid:5', 68, 56, '55.80', '56.10', '68.19', '67.11'], ['episode:2309,subgoal:2,grid:5', 68, 65, '64.80', '65.90', '68.15', '67.10'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.85', '70.86', '65.20', '64.13'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.19', '70.18', '65.16', '64.88'], ['episode:2309,subgoal:2,grid:4', 62, 70, '69.20', '70.20', '62.16', '61.87'], ['episode:2309,subgoal:2,grid:4', 63, 69, '68.10', '69.15', '63.20', '62.89'], ['episode:2309,subgoal:2,grid:4', 64, 70, '69.18', '70.16', '64.20', '63.16'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.16', '70.88', '65.89', '64.20'], ['episode:2309,subgoal:2,grid:4', 65, 67, '66.17', '67.13', '65.84', '64.88'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.85', '70.82', '65.17', '64.80'], ['episode:2309,subgoal:2,grid:4', 64, 70, '69.84', '70.15', '64.19', '63.80'], ['episode:2309,subgoal:2,grid:4', 61, 70, '69.80', '70.19', '61.14', '60.13'], ['episode:2309,subgoal:2,grid:4', 62, 70, '69.80', '70.11', '62.13', '61.15'], ['episode:2309,subgoal:2,grid:4', 68, 67, '66.83', '67.18', '68.11', '67.84'], ['episode:2309,subgoal:2,grid:4', 64, 70, '69.14', '70.80', '64.11', '63.80'], ['episode:2309,subgoal:2,grid:4', 65, 68, '67.86', '68.84', '65.87', '64.80'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.20', '70.83', '65.16', '64.80'], ['episode:2309,subgoal:2,grid:4', 64, 70, '69.14', '70.80', '64.11', '63.80'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.13', '70.85', '65.80', '64.89'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.88', '70.85', '65.16', '64.80'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.20', '70.82', '65.11', '64.81'], ['episode:2309,subgoal:2,grid:4', 68, 70, '69.20', '70.20', '68.13', '67.83'], ['episode:2309,subgoal:2,grid:4', 68, 70, '69.80', '70.87', '68.10', '67.84'], ['episode:2309,subgoal:2,grid:4', 68, 67, '66.15', '67.89', '68.81', '67.17'], ['episode:2309,subgoal:2,grid:5', 62, 59, '58.80', '59.80', '62.18', '61.81'], ['episode:2309,subgoal:2,grid:4', 68, 70, '69.80', '70.11', '68.12', '67.80'], ['episode:2309,subgoal:2,grid:4', 65, 70, '69.86', '70.20', '65.12', '64.85'], ['episode:2309,subgoal:2,grid:4', 62, 70, '69.80', '70.16', '62.80', '61.81'], ['episode:2309,subgoal:2,grid:4', 66, 70, '69.80', '70.19', '66.80', '65.87'], ['episode:2309,subgoal:2,grid:5', 65, 62, '61.87', '62.80', '65.19', '64.81'], ['episode:2309,subgoal:2,grid:5', 68, 57, '56.82', '57.20', '68.13', '67.84'], ['episode:2309,subgoal:2,grid:4', 68, 66, '65.17', '66.18', '68.11', '67.80'], ['episode:2309,subgoal:2,grid:5', 68, 58, '57.81', '58.19', '68.18', '67.81'], ['episode:2309,subgoal:2,grid:5', 68, 52, '51.81', '52.19', '68.20', '67.84'], ['episode:2309,subgoal:2,grid:6', 61, 36, '35.81', '36.13', '61.13', '60.87'], ['episode:2309,subgoal:2,grid:7', 63, 22, '21.20', '22.90', '63.90', '62.80'], ['episode:2310,subgoal:2,grid:6', 66, 50, '49.80', '50.17', '66.20', '65.80'], ['episode:2310,subgoal:2,grid:5', 68, 58, '57.86', '58.19', '68.12', '67.90'], ['episode:2310,subgoal:2,grid:5', 69, 54, '53.89', '54.87', '69.18', '68.84'], ['episode:2310,subgoal:2,grid:4', 60, 70, '69.12', '70.83', '60.13', '59.80'], ['episode:2310,subgoal:2,grid:5', 65, 65, '64.86', '65.88', '65.86', '64.86'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.87', '70.86', '61.86', '60.80'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.16', '70.88', '61.80', '60.10'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.80', '70.88', '62.13', '61.89'], ['episode:2310,subgoal:2,grid:4', 63, 69, '68.89', '69.89', '63.15', '62.80'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.18', '70.14', '62.15', '61.83'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.14', '70.14', '62.20', '61.87'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.20', '70.13', '62.86', '61.13'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.20', '70.11', '61.15', '60.88'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.86', '70.20', '61.18', '60.87'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.89', '70.17', '61.20', '60.87'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.83', '70.11', '61.20', '60.82'], ['episode:2310,subgoal:2,grid:4', 69, 70, '69.85', '70.85', '69.15', '68.80'], ['episode:2310,subgoal:2,grid:4', 64, 70, '69.14', '70.17', '64.19', '63.81'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.81', '70.20', '61.16', '60.85'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.15', '70.20', '61.80', '60.14'], ['episode:2310,subgoal:2,grid:4', 59, 70, '69.82', '70.13', '59.16', '58.88'], ['episode:2310,subgoal:2,grid:3', 50, 70, '69.17', '70.80', '50.88', '49.86'], ['episode:2310,subgoal:2,grid:3', 50, 70, '69.85', '70.12', '50.18', '49.87'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.13', '76.80', '50.17', '49.16'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.89', '76.84', '50.18', '49.10'], ['episode:2310,subgoal:2,grid:3', 50, 75, '74.84', '75.14', '50.89', '49.12'], ['episode:2310,subgoal:2,grid:5', 56, 65, '64.85', '65.14', '56.17', '55.89'], ['episode:2310,subgoal:2,grid:3', 45, 75, '74.16', '75.88', '45.12', '44.20'], ['episode:2310,subgoal:2,grid:3', 48, 76, '75.20', '76.86', '48.90', '47.15'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.19', '76.80', '50.19', '49.85'], ['episode:2310,subgoal:2,grid:2', 50, 63, '62.80', '63.80', '50.18', '49.81'], ['episode:2310,subgoal:2,grid:3', 44, 71, '70.20', '71.85', '44.83', '43.16'], ['episode:2310,subgoal:2,grid:3', 48, 68, '67.83', '68.81', '48.20', '47.82'], ['episode:2310,subgoal:2,grid:3', 51, 76, '75.12', '76.20', '51.87', '50.80'], ['episode:2310,subgoal:2,grid:3', 44, 77, '76.87', '77.89', '44.14', '43.86'], ['episode:2310,subgoal:2,grid:3', 44, 77, '76.80', '77.11', '44.15', '43.82'], ['episode:2310,subgoal:2,grid:3', 48, 76, '75.85', '76.84', '48.83', '47.87'], ['episode:2310,subgoal:2,grid:3', 50, 66, '65.80', '66.80', '50.17', '49.86'], ['episode:2310,subgoal:2,grid:4', 57, 67, '66.13', '67.20', '57.17', '56.88'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.86', '70.20', '54.18', '53.85'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.11', '70.17', '54.20', '53.82'], ['episode:2310,subgoal:2,grid:3', 53, 70, '69.86', '70.14', '53.15', '52.80'], ['episode:2310,subgoal:2,grid:4', 57, 67, '66.20', '67.11', '57.88', '56.13'], ['episode:2310,subgoal:2,grid:4', 56, 67, '66.20', '67.11', '56.86', '55.89'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.89', '70.15', '55.16', '54.80'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.89', '70.20', '55.14', '54.11'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.13', '70.20', '55.86', '54.15'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.12', '70.20', '54.12', '53.90'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.89', '70.20', '54.10', '53.87'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.87', '70.20', '54.87', '53.12']]
      ;
      let subgoal3_data = [['episode:2309,subgoal:3,grid:8', 65, 12, '11.84', '12.89', '65.20', '64.88'], ['episode:2309,subgoal:3,grid:8', 64, 12, '11.80', '12.88', '64.19', '63.85'], ['episode:2309,subgoal:3,grid:8', 63, 12, '11.82', '12.89', '63.20', '62.87'], ['episode:2309,subgoal:3,grid:8', 63, 12, '11.80', '12.11', '63.18', '62.87'], ['episode:2309,subgoal:3,grid:8', 62, 12, '11.82', '12.89', '62.20', '61.88'], ['episode:2309,subgoal:3,grid:8', 63, 14, '13.82', '14.85', '63.20', '62.88'], ['episode:2309,subgoal:3,grid:8', 61, 12, '11.80', '12.11', '61.20', '60.86'], ['episode:2309,subgoal:3,grid:8', 61, 12, '11.80', '12.89', '61.17', '60.87'], ['episode:2309,subgoal:3,grid:8', 59, 12, '11.80', '12.88', '59.20', '58.85'], ['episode:2309,subgoal:3,grid:8', 66, 15, '14.82', '15.88', '66.20', '65.87'], ['episode:2309,subgoal:3,grid:7', 68, 20, '19.84', '20.90', '68.20', '67.89'], ['episode:2309,subgoal:3,grid:7', 67, 23, '22.81', '23.11', '67.20', '66.85'], ['episode:2309,subgoal:3,grid:7', 68, 33, '32.80', '33.11', '68.20', '67.85']]
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