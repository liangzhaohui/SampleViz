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
      let subgoal0_data = [['episode:2311,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '39.20', '38.90'], ['episode:2311,subgoal:0,grid:2', 47, 56, '55.20', '56.85', '47.16', '46.81'], ['episode:2311,subgoal:0,grid:2', 44, 56, '55.80', '56.13', '44.17', '43.86'], ['episode:2311,subgoal:0,grid:4', 56, 67, '66.86', '67.90', '56.20', '55.86'], ['episode:2311,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.80'], ['episode:2311,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.83'], ['episode:2311,subgoal:0,grid:4', 63, 70, '69.80', '70.11', '63.86', '62.89'], ['episode:2312,subgoal:0,grid:0', 31, 42, '41.89', '42.12', '31.20', '30.89'], ['episode:2312,subgoal:0,grid:2', 49, 58, '57.14', '58.88', '49.12', '48.20'], ['episode:2312,subgoal:0,grid:2', 39, 62, '61.80', '62.88', '39.80', '38.87'], ['episode:2312,subgoal:0,grid:4', 55, 70, '69.10', '70.84', '55.20', '54.11'], ['episode:2312,subgoal:0,grid:4', 55, 70, '69.85', '70.13', '55.20', '54.82'], ['episode:2312,subgoal:0,grid:4', 55, 70, '69.89', '70.87', '55.12', '54.81'], ['episode:2312,subgoal:0,grid:4', 65, 70, '69.80', '70.89', '65.88', '64.89'], ['episode:2313,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2313,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2313,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2313,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2313,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2313,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2313,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2314,subgoal:0,grid:0', 27, 46, '45.89', '46.15', '27.80', '26.88'], ['episode:2314,subgoal:0,grid:2', 48, 58, '57.81', '58.19', '48.19', '47.81'], ['episode:2314,subgoal:0,grid:3', 44, 67, '66.14', '67.14', '44.81', '43.18'], ['episode:2314,subgoal:0,grid:4', 55, 70, '69.10', '70.14', '55.20', '54.90'], ['episode:2314,subgoal:0,grid:4', 55, 70, '69.88', '70.11', '55.18', '54.88'], ['episode:2314,subgoal:0,grid:4', 57, 69, '68.84', '69.14', '57.16', '56.86'], ['episode:2314,subgoal:0,grid:4', 66, 70, '69.80', '70.11', '66.88', '65.86'], ['episode:2315,subgoal:0,grid:0', 26, 48, '47.20', '48.85', '26.11', '25.14'], ['episode:2315,subgoal:0,grid:2', 46, 58, '57.81', '58.19', '46.20', '45.81'], ['episode:2315,subgoal:0,grid:3', 47, 68, '67.11', '68.85', '47.80', '46.10'], ['episode:2315,subgoal:0,grid:4', 55, 70, '69.20', '70.15', '55.20', '54.87'], ['episode:2315,subgoal:0,grid:4', 55, 70, '69.84', '70.11', '55.18', '54.85'], ['episode:2315,subgoal:0,grid:4', 57, 69, '68.82', '69.16', '57.19', '56.83'], ['episode:2315,subgoal:0,grid:4', 67, 70, '69.80', '70.80', '67.87', '66.80']]
      ;
      let subgoal1_data = [['episode:2311,subgoal:1,grid:5', 68, 65, '64.84', '65.16', '68.80', '67.13'], ['episode:2311,subgoal:1,grid:5', 68, 63, '62.83', '63.20', '68.83', '67.87'], ['episode:2312,subgoal:1,grid:5', 68, 63, '62.82', '63.16', '68.80', '67.12'], ['episode:2312,subgoal:1,grid:5', 68, 63, '62.14', '63.10', '68.80', '67.18'], ['episode:2313,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2313,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2314,subgoal:1,grid:5', 68, 65, '64.83', '65.17', '68.83', '67.12'], ['episode:2314,subgoal:1,grid:5', 61, 60, '59.10', '60.13', '61.81', '60.17'], ['episode:2315,subgoal:1,grid:5', 68, 65, '64.85', '65.18', '68.86', '67.10'], ['episode:2315,subgoal:1,grid:5', 61, 57, '56.87', '57.90', '61.89', '60.17']]

      ;
      let subgoal2_data = [['episode:2310,subgoal:2,grid:4', 62, 70, '69.80', '70.88', '62.13', '61.89'], ['episode:2310,subgoal:2,grid:4', 63, 69, '68.89', '69.89', '63.15', '62.80'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.18', '70.14', '62.15', '61.83'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.14', '70.14', '62.20', '61.87'], ['episode:2310,subgoal:2,grid:4', 62, 70, '69.20', '70.13', '62.86', '61.13'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.20', '70.11', '61.15', '60.88'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.86', '70.20', '61.18', '60.87'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.89', '70.17', '61.20', '60.87'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.83', '70.11', '61.20', '60.82'], ['episode:2310,subgoal:2,grid:4', 69, 70, '69.85', '70.85', '69.15', '68.80'], ['episode:2310,subgoal:2,grid:4', 64, 70, '69.14', '70.17', '64.19', '63.81'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.81', '70.20', '61.16', '60.85'], ['episode:2310,subgoal:2,grid:4', 61, 70, '69.15', '70.20', '61.80', '60.14'], ['episode:2310,subgoal:2,grid:4', 59, 70, '69.82', '70.13', '59.16', '58.88'], ['episode:2310,subgoal:2,grid:3', 50, 70, '69.17', '70.80', '50.88', '49.86'], ['episode:2310,subgoal:2,grid:3', 50, 70, '69.85', '70.12', '50.18', '49.87'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.13', '76.80', '50.17', '49.16'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.89', '76.84', '50.18', '49.10'], ['episode:2310,subgoal:2,grid:3', 50, 75, '74.84', '75.14', '50.89', '49.12'], ['episode:2310,subgoal:2,grid:5', 56, 65, '64.85', '65.14', '56.17', '55.89'], ['episode:2310,subgoal:2,grid:3', 45, 75, '74.16', '75.88', '45.12', '44.20'], ['episode:2310,subgoal:2,grid:3', 48, 76, '75.20', '76.86', '48.90', '47.15'], ['episode:2310,subgoal:2,grid:3', 50, 76, '75.19', '76.80', '50.19', '49.85'], ['episode:2310,subgoal:2,grid:2', 50, 63, '62.80', '63.80', '50.18', '49.81'], ['episode:2310,subgoal:2,grid:3', 44, 71, '70.20', '71.85', '44.83', '43.16'], ['episode:2310,subgoal:2,grid:3', 48, 68, '67.83', '68.81', '48.20', '47.82'], ['episode:2310,subgoal:2,grid:3', 51, 76, '75.12', '76.20', '51.87', '50.80'], ['episode:2310,subgoal:2,grid:3', 44, 77, '76.87', '77.89', '44.14', '43.86'], ['episode:2310,subgoal:2,grid:3', 44, 77, '76.80', '77.11', '44.15', '43.82'], ['episode:2310,subgoal:2,grid:3', 48, 76, '75.85', '76.84', '48.83', '47.87'], ['episode:2310,subgoal:2,grid:3', 50, 66, '65.80', '66.80', '50.17', '49.86'], ['episode:2310,subgoal:2,grid:4', 57, 67, '66.13', '67.20', '57.17', '56.88'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.86', '70.20', '54.18', '53.85'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.11', '70.17', '54.20', '53.82'], ['episode:2310,subgoal:2,grid:3', 53, 70, '69.86', '70.14', '53.15', '52.80'], ['episode:2310,subgoal:2,grid:4', 57, 67, '66.20', '67.11', '57.88', '56.13'], ['episode:2310,subgoal:2,grid:4', 56, 67, '66.20', '67.11', '56.86', '55.89'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.89', '70.15', '55.16', '54.80'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.89', '70.20', '55.14', '54.11'], ['episode:2310,subgoal:2,grid:4', 55, 70, '69.13', '70.20', '55.86', '54.15'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.12', '70.20', '54.12', '53.90'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.89', '70.20', '54.10', '53.87'], ['episode:2310,subgoal:2,grid:3', 54, 70, '69.87', '70.20', '54.87', '53.12'], ['episode:2311,subgoal:2,grid:5', 68, 54, '53.80', '54.19', '68.20', '67.80'], ['episode:2311,subgoal:2,grid:6', 67, 45, '44.81', '45.18', '67.12', '66.83'], ['episode:2311,subgoal:2,grid:6', 68, 42, '41.80', '42.11', '68.19', '67.85'], ['episode:2311,subgoal:2,grid:5', 66, 53, '52.11', '53.85', '66.20', '65.85'], ['episode:2311,subgoal:2,grid:5', 60, 65, '64.86', '65.88', '60.88', '59.11'], ['episode:2311,subgoal:2,grid:5', 68, 59, '58.80', '59.19', '68.17', '67.82'], ['episode:2311,subgoal:2,grid:5', 62, 52, '51.11', '52.90', '62.88', '61.80'], ['episode:2311,subgoal:2,grid:6', 63, 45, '44.80', '45.18', '63.90', '62.81'], ['episode:2311,subgoal:2,grid:7', 68, 32, '31.84', '32.11', '68.81', '67.20'], ['episode:2311,subgoal:2,grid:8', 66, 17, '16.20', '17.88', '66.89', '65.80'], ['episode:2312,subgoal:2,grid:5', 65, 55, '54.81', '55.20', '65.20', '64.81'], ['episode:2312,subgoal:2,grid:5', 68, 57, '56.80', '57.19', '68.18', '67.84'], ['episode:2312,subgoal:2,grid:5', 68, 63, '62.83', '63.82', '68.20', '67.89'], ['episode:2312,subgoal:2,grid:4', 69, 70, '69.82', '70.84', '69.20', '68.13'], ['episode:2312,subgoal:2,grid:4', 68, 70, '69.80', '70.87', '68.18', '67.13'], ['episode:2312,subgoal:2,grid:4', 62, 70, '69.80', '70.13', '62.16', '61.11'], ['episode:2312,subgoal:2,grid:5', 69, 59, '58.81', '59.20', '69.20', '68.81'], ['episode:2312,subgoal:2,grid:4', 66, 69, '68.83', '69.16', '66.20', '65.81'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.20', '70.20', '64.88', '63.84'], ['episode:2312,subgoal:2,grid:4', 65, 68, '67.90', '68.17', '65.20', '64.81'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.88', '70.12', '64.19', '63.85'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.17', '70.90', '64.16', '63.10'], ['episode:2312,subgoal:2,grid:4', 63, 67, '66.90', '67.80', '63.15', '62.84'], ['episode:2312,subgoal:2,grid:4', 62, 70, '69.88', '70.85', '62.15', '61.81'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.18', '70.80', '64.89', '63.15'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.15', '70.80', '64.18', '63.86'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.20', '70.82', '64.20', '63.87'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.20', '70.86', '64.20', '63.82'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.17', '70.12', '64.10', '63.81'], ['episode:2312,subgoal:2,grid:4', 66, 70, '69.20', '70.88', '66.88', '65.80'], ['episode:2312,subgoal:2,grid:4', 66, 70, '69.87', '70.85', '66.10', '65.80'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.13', '70.85', '64.82', '63.84'], ['episode:2312,subgoal:2,grid:4', 65, 66, '65.12', '66.81', '65.84', '64.80'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.85', '70.84', '64.80', '63.80'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.89', '70.89', '64.86', '63.87'], ['episode:2312,subgoal:2,grid:4', 62, 70, '69.89', '70.89', '62.89', '61.84'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.10', '70.89', '61.10', '60.86'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.89', '70.10', '61.12', '60.83'], ['episode:2312,subgoal:2,grid:4', 62, 68, '67.86', '68.12', '62.17', '61.81'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.17', '70.87', '61.13', '60.82'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.14', '70.89', '61.86', '60.85'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.17', '70.11', '61.80', '60.86'], ['episode:2312,subgoal:2,grid:4', 61, 70, '69.16', '70.87', '61.80', '60.85'], ['episode:2312,subgoal:2,grid:4', 60, 66, '65.19', '66.12', '60.80', '59.83'], ['episode:2312,subgoal:2,grid:4', 57, 70, '69.17', '70.18', '57.83', '56.14'], ['episode:2312,subgoal:2,grid:4', 56, 70, '69.13', '70.16', '56.80', '55.11'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.12', '70.19', '54.86', '53.13'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.11', '70.20', '54.88', '53.20'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.15', '70.17', '54.82', '53.20'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.10', '70.20', '54.84', '53.19'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.12', '70.20', '54.85', '53.15'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.18', '70.20', '54.80', '53.13'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.17', '70.13', '54.80', '53.80'], ['episode:2312,subgoal:2,grid:3', 54, 70, '69.90', '70.15', '54.81', '53.81'], ['episode:2312,subgoal:2,grid:4', 56, 70, '69.87', '70.16', '56.81', '55.17'], ['episode:2312,subgoal:2,grid:4', 59, 70, '69.80', '70.14', '59.85', '58.14'], ['episode:2312,subgoal:2,grid:4', 64, 70, '69.88', '70.81', '64.82', '63.80'], ['episode:2312,subgoal:2,grid:4', 63, 67, '66.10', '67.81', '63.14', '62.80'], ['episode:2312,subgoal:2,grid:4', 62, 68, '67.87', '68.83', '62.11', '61.80'], ['episode:2312,subgoal:2,grid:4', 62, 70, '69.86', '70.87', '62.20', '61.83'], ['episode:2313,subgoal:2,grid:5', 68, 51, '50.81', '51.20', '68.20', '67.81'], ['episode:2313,subgoal:2,grid:5', 63, 56, '55.20', '56.82', '63.14', '62.19'], ['episode:2313,subgoal:2,grid:4', 68, 70, '69.12', '70.90', '68.20', '67.20'], ['episode:2313,subgoal:2,grid:4', 65, 66, '65.88', '66.20', '65.18', '64.20'], ['episode:2313,subgoal:2,grid:4', 65, 67, '66.12', '67.20', '65.88', '64.20'], ['episode:2313,subgoal:2,grid:4', 62, 70, '69.11', '70.20', '62.11', '61.20'], ['episode:2313,subgoal:2,grid:4', 64, 70, '69.89', '70.20', '64.12', '63.15'], ['episode:2313,subgoal:2,grid:4', 62, 70, '69.11', '70.19', '62.15', '61.14'], ['episode:2313,subgoal:2,grid:4', 63, 69, '68.14', '69.20', '63.86', '62.14'], ['episode:2313,subgoal:2,grid:4', 62, 70, '69.86', '70.20', '62.12', '61.15'], ['episode:2313,subgoal:2,grid:4', 65, 70, '69.80', '70.13', '65.89', '64.13'], ['episode:2313,subgoal:2,grid:4', 62, 66, '65.14', '66.86', '62.86', '61.18'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.89', '70.90', '56.16', '55.86'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.84', '70.16', '56.15', '55.11'], ['episode:2313,subgoal:2,grid:4', 59, 70, '69.80', '70.19', '59.19', '58.11'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.81', '70.20', '54.17', '53.11'], ['episode:2313,subgoal:2,grid:4', 58, 68, '67.14', '68.20', '58.88', '57.13'], ['episode:2313,subgoal:2,grid:4', 57, 70, '69.84', '70.13', '57.86', '56.16'], ['episode:2313,subgoal:2,grid:4', 58, 69, '68.11', '69.87', '58.80', '57.10'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.84', '70.85', '56.14', '55.20'], ['episode:2313,subgoal:2,grid:4', 59, 70, '69.86', '70.80', '59.20', '58.87'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.20', '70.81', '56.80', '55.19'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.86', '70.80', '56.20', '55.87'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.88', '70.84', '56.88', '55.13'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.88', '70.13', '56.12', '55.89'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.85', '70.88', '56.20', '55.88'], ['episode:2313,subgoal:2,grid:4', 57, 68, '67.19', '68.13', '57.13', '56.11'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.20', '70.83', '56.88', '55.12'], ['episode:2313,subgoal:2,grid:4', 56, 70, '69.18', '70.80', '56.82', '55.80'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.16', '70.14', '54.88', '53.80'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.13', '70.18', '54.12', '53.80'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.14', '70.20', '54.84', '53.86'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.10', '70.18', '54.87', '53.80'], ['episode:2313,subgoal:2,grid:4', 56, 67, '66.11', '67.20', '56.11', '55.83'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.89', '70.20', '54.17', '53.85'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.16', '70.90', '54.89', '53.82'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.20', '70.87', '54.84', '53.10'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.20', '70.87', '54.89', '53.80'], ['episode:2313,subgoal:2,grid:4', 56, 69, '68.20', '69.81', '56.83', '55.85'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.16', '70.89', '54.84', '53.85'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.85', '70.20', '54.11', '53.86'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.87', '70.20', '54.80', '53.17'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.16', '70.17', '54.85', '53.15'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.14', '70.20', '54.88', '53.20'], ['episode:2313,subgoal:2,grid:4', 56, 67, '66.10', '67.20', '56.17', '55.20'], ['episode:2313,subgoal:2,grid:3', 54, 70, '69.10', '70.16', '54.20', '53.20'], ['episode:2313,subgoal:2,grid:3', 53, 70, '69.86', '70.86', '53.15', '52.14'], ['episode:2313,subgoal:2,grid:3', 53, 70, '69.11', '70.85', '53.89', '52.15'], ['episode:2313,subgoal:2,grid:4', 55, 68, '67.10', '68.89', '55.11', '54.90'], ['episode:2313,subgoal:2,grid:3', 53, 70, '69.88', '70.14', '53.10', '52.87'], ['episode:2314,subgoal:2,grid:5', 65, 60, '59.84', '60.14', '65.12', '64.83'], ['episode:2314,subgoal:2,grid:5', 62, 60, '59.89', '60.85', '62.10', '61.81'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.83', '70.80', '68.13', '67.15'], ['episode:2314,subgoal:2,grid:4', 60, 70, '69.86', '70.85', '60.20', '59.13'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.87', '68.19', '67.88'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.13', '68.89', '67.18'], ['episode:2314,subgoal:2,grid:4', 69, 67, '66.82', '67.15', '69.20', '68.81'], ['episode:2314,subgoal:2,grid:4', 62, 70, '69.80', '70.12', '62.83', '61.85'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.87', '68.12', '67.90'], ['episode:2314,subgoal:2,grid:4', 63, 67, '66.80', '67.80', '63.88', '62.20'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.85', '68.12', '67.88'], ['episode:2314,subgoal:2,grid:5', 65, 62, '61.85', '62.83', '65.83', '64.10'], ['episode:2314,subgoal:2,grid:5', 61, 64, '63.80', '64.14', '61.80', '60.17'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.84', '68.80', '67.19'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.86', '68.89', '67.17'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.89', '68.87', '67.18'], ['episode:2314,subgoal:2,grid:5', 62, 64, '63.86', '64.80', '62.89', '61.13'], ['episode:2314,subgoal:2,grid:4', 69, 67, '66.87', '67.83', '69.17', '68.80'], ['episode:2314,subgoal:2,grid:4', 69, 70, '69.85', '70.87', '69.20', '68.11'], ['episode:2314,subgoal:2,grid:4', 69, 66, '65.84', '66.84', '69.20', '68.15'], ['episode:2314,subgoal:2,grid:4', 66, 69, '68.81', '69.12', '66.20', '65.85'], ['episode:2314,subgoal:2,grid:4', 62, 70, '69.83', '70.87', '62.20', '61.20'], ['episode:2314,subgoal:2,grid:4', 69, 70, '69.83', '70.85', '69.20', '68.86'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.12', '68.14', '67.89'], ['episode:2314,subgoal:2,grid:4', 68, 70, '69.80', '70.17', '68.17', '67.88'], ['episode:2314,subgoal:2,grid:4', 66, 70, '69.89', '70.80', '66.11', '65.10'], ['episode:2314,subgoal:2,grid:5', 62, 59, '58.86', '59.17', '62.19', '61.12'], ['episode:2314,subgoal:2,grid:5', 65, 63, '62.11', '63.80', '65.86', '64.12'], ['episode:2314,subgoal:2,grid:5', 62, 65, '64.87', '65.80', '62.87', '61.85'], ['episode:2314,subgoal:2,grid:4', 62, 70, '69.12', '70.82', '62.80', '61.19'], ['episode:2314,subgoal:2,grid:4', 69, 70, '69.80', '70.86', '69.18', '68.87'], ['episode:2314,subgoal:2,grid:5', 68, 60, '59.80', '60.18', '68.20', '67.86'], ['episode:2314,subgoal:2,grid:5', 67, 62, '61.83', '62.80', '67.20', '66.87'], ['episode:2314,subgoal:2,grid:4', 68, 69, '68.86', '69.84', '68.14', '67.16'], ['episode:2314,subgoal:2,grid:4', 69, 70, '69.90', '70.88', '69.20', '68.15'], ['episode:2314,subgoal:2,grid:4', 64, 70, '69.88', '70.12', '64.20', '63.20'], ['episode:2314,subgoal:2,grid:4', 65, 70, '69.20', '70.86', '65.20', '64.17'], ['episode:2314,subgoal:2,grid:4', 56, 70, '69.20', '70.15', '56.81', '55.80'], ['episode:2314,subgoal:2,grid:4', 55, 70, '69.85', '70.19', '55.14', '54.80'], ['episode:2314,subgoal:2,grid:3', 53, 70, '69.15', '70.20', '53.83', '52.86'], ['episode:2314,subgoal:2,grid:4', 60, 70, '69.82', '70.89', '60.16', '59.11'], ['episode:2314,subgoal:2,grid:4', 64, 70, '69.83', '70.12', '64.16', '63.87'], ['episode:2314,subgoal:2,grid:4', 64, 67, '66.84', '67.80', '64.19', '63.85'], ['episode:2314,subgoal:2,grid:5', 68, 65, '64.13', '65.86', '68.83', '67.20'], ['episode:2314,subgoal:2,grid:4', 64, 70, '69.81', '70.86', '64.18', '63.87'], ['episode:2314,subgoal:2,grid:4', 63, 70, '69.86', '70.80', '63.13', '62.10'], ['episode:2314,subgoal:2,grid:4', 58, 68, '67.89', '68.84', '58.15', '57.84'], ['episode:2314,subgoal:2,grid:3', 53, 70, '69.19', '70.84', '53.85', '52.83'], ['episode:2314,subgoal:2,grid:4', 55, 70, '69.13', '70.87', '55.17', '54.80'], ['episode:2314,subgoal:2,grid:4', 55, 70, '69.19', '70.20', '55.18', '54.81'], ['episode:2315,subgoal:2,grid:5', 68, 61, '60.14', '61.80', '68.16', '67.12'], ['episode:2315,subgoal:2,grid:5', 68, 63, '62.14', '63.85', '68.11', '67.20'], ['episode:2315,subgoal:2,grid:4', 66, 70, '69.19', '70.89', '66.89', '65.17'], ['episode:2315,subgoal:2,grid:5', 68, 64, '63.86', '64.13', '68.16', '67.82'], ['episode:2315,subgoal:2,grid:5', 61, 62, '61.87', '62.80', '61.88', '60.18'], ['episode:2315,subgoal:2,grid:5', 68, 56, '55.81', '56.19', '68.15', '67.83'], ['episode:2315,subgoal:2,grid:6', 61, 50, '49.82', '50.17', '61.80', '60.80'], ['episode:2315,subgoal:2,grid:6', 66, 42, '41.20', '42.86', '66.82', '65.13'], ['episode:2315,subgoal:2,grid:7', 68, 26, '25.13', '26.88', '68.86', '67.20'], ['episode:2315,subgoal:2,grid:7', 61, 20, '19.16', '20.20', '61.12', '60.87'], ['episode:2315,subgoal:2,grid:7', 68, 25, '24.84', '25.85', '68.89', '67.18'], ['episode:2315,subgoal:2,grid:7', 68, 25, '24.86', '25.89', '68.80', '67.15'], ['episode:2315,subgoal:2,grid:7', 62, 24, '23.86', '24.12', '62.80', '61.85'], ['episode:2315,subgoal:2,grid:7', 67, 25, '24.86', '25.88', '67.80', '66.82']]

      ;
      let subgoal3_data = [['episode:2311,subgoal:3,grid:8', 64, 12, '11.80', '12.14', '64.20', '63.84'], ['episode:2311,subgoal:3,grid:7', 64, 21, '20.80', '21.88', '64.19', '63.90'], ['episode:2311,subgoal:3,grid:7', 68, 23, '22.80', '23.13', '68.20', '67.87'], ['episode:2311,subgoal:3,grid:8', 68, 15, '14.81', '15.84', '68.20', '67.10'], ['episode:2311,subgoal:3,grid:8', 68, 16, '15.81', '16.10', '68.20', '67.87'], ['episode:2311,subgoal:3,grid:7', 66, 31, '30.80', '31.88', '66.20', '65.88'], ['episode:2315,subgoal:3,grid:8', 64, 12, '11.81', '12.13', '64.20', '63.86'], ['episode:2315,subgoal:3,grid:8', 64, 12, '11.81', '12.11', '64.20', '63.86'], ['episode:2315,subgoal:3,grid:8', 62, 17, '16.80', '17.88', '62.19', '61.86'], ['episode:2315,subgoal:3,grid:7', 64, 21, '20.81', '21.89', '64.20', '63.85'], ['episode:2315,subgoal:3,grid:7', 62, 21, '20.82', '21.11', '62.20', '61.87'], ['episode:2315,subgoal:3,grid:8', 62, 12, '11.82', '12.88', '62.20', '61.86'], ['episode:2315,subgoal:3,grid:8', 64, 12, '11.80', '12.15', '64.19', '63.84'], ['episode:2315,subgoal:3,grid:8', 63, 12, '11.80', '12.88', '63.20', '62.87'], ['episode:2315,subgoal:3,grid:8', 61, 12, '11.83', '12.11', '61.20', '60.87'], ['episode:2315,subgoal:3,grid:8', 59, 12, '11.80', '12.85', '59.20', '58.88'], ['episode:2315,subgoal:3,grid:8', 57, 12, '11.81', '12.10', '57.20', '56.11'], ['episode:2315,subgoal:3,grid:8', 61, 12, '11.80', '12.86', '61.20', '60.89'], ['episode:2315,subgoal:3,grid:8', 65, 12, '11.80', '12.10', '65.20', '64.84'], ['episode:2315,subgoal:3,grid:8', 66, 11, '10.83', '11.88', '66.20', '65.88'], ['episode:2315,subgoal:3,grid:6', 64, 37, '36.85', '37.11', '64.20', '63.88'], ['episode:2315,subgoal:3,grid:7', 63, 27, '26.82', '27.88', '63.20', '62.87'], ['episode:2315,subgoal:3,grid:8', 62, 12, '11.80', '12.13', '62.18', '61.86'], ['episode:2315,subgoal:3,grid:8', 62, 12, '11.82', '12.89', '62.20', '61.89'], ['episode:2315,subgoal:3,grid:8', 65, 12, '11.80', '12.11', '65.18', '64.87'], ['episode:2315,subgoal:3,grid:8', 68, 12, '11.83', '12.88', '68.20', '67.87'], ['episode:2315,subgoal:3,grid:7', 66, 22, '21.81', '22.11', '66.20', '65.87'], ['episode:2315,subgoal:3,grid:8', 64, 12, '11.81', '12.89', '64.20', '63.87'], ['episode:2315,subgoal:3,grid:8', 62, 19, '18.81', '19.11', '62.20', '61.85'], ['episode:2315,subgoal:3,grid:7', 68, 31, '30.82', '31.87', '68.20', '67.87'], ['episode:2315,subgoal:3,grid:6', 65, 43, '42.84', '43.11', '65.20', '64.87']]

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