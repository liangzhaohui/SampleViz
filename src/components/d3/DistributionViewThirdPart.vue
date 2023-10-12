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
      let subgoal0_data =[['episode:2433,subgoal:0,grid:0', 31, 50, '49.11', '50.15', '31.88', '30.86'], ['episode:2433,subgoal:0,grid:2', 46, 58, '57.83', '58.20', '46.19', '45.80'], ['episode:2433,subgoal:0,grid:3', 54, 70, '69.80', '70.81', '54.84', '53.20'], ['episode:2433,subgoal:0,grid:4', 55, 70, '69.20', '70.14', '55.16', '54.86'], ['episode:2433,subgoal:0,grid:4', 55, 70, '69.86', '70.10', '55.12', '54.84'], ['episode:2433,subgoal:0,grid:4', 55, 70, '69.89', '70.10', '55.16', '54.86'], ['episode:2434,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2434,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2434,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2434,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2434,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2434,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2434,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2435,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.89'], ['episode:2435,subgoal:0,grid:2', 40, 53, '52.83', '53.80', '40.87', '39.90'], ['episode:2435,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.80'], ['episode:2435,subgoal:0,grid:4', 55, 70, '69.81', '70.87', '55.11', '54.11'], ['episode:2435,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '55.20', '54.87'], ['episode:2435,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.82'], ['episode:2435,subgoal:0,grid:4', 61, 68, '67.80', '68.14', '61.15', '60.86'], ['episode:2436,subgoal:0,grid:0', 27, 46, '45.89', '46.15', '27.80', '26.88'], ['episode:2436,subgoal:0,grid:2', 48, 58, '57.81', '58.19', '48.19', '47.81'], ['episode:2436,subgoal:0,grid:3', 44, 67, '66.14', '67.14', '44.81', '43.18'], ['episode:2436,subgoal:0,grid:4', 55, 70, '69.10', '70.14', '55.20', '54.90'], ['episode:2436,subgoal:0,grid:4', 55, 70, '69.88', '70.11', '55.18', '54.88'], ['episode:2436,subgoal:0,grid:4', 57, 69, '68.84', '69.14', '57.16', '56.86'], ['episode:2436,subgoal:0,grid:4', 66, 70, '69.80', '70.11', '66.88', '65.86'], ['episode:2437,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.89'], ['episode:2437,subgoal:0,grid:2', 40, 53, '52.83', '53.80', '40.87', '39.90'], ['episode:2437,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.80'], ['episode:2437,subgoal:0,grid:4', 55, 70, '69.81', '70.87', '55.11', '54.11'], ['episode:2437,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '55.20', '54.87'], ['episode:2437,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.82'], ['episode:2437,subgoal:0,grid:4', 61, 68, '67.80', '68.14', '61.15', '60.86'], ['episode:2438,subgoal:0,grid:0', 31, 42, '41.89', '42.12', '31.20', '30.89'], ['episode:2438,subgoal:0,grid:2', 49, 58, '57.14', '58.88', '49.12', '48.20'], ['episode:2438,subgoal:0,grid:2', 39, 62, '61.80', '62.88', '39.80', '38.87'], ['episode:2438,subgoal:0,grid:4', 55, 70, '69.10', '70.84', '55.20', '54.11'], ['episode:2438,subgoal:0,grid:4', 55, 70, '69.85', '70.13', '55.20', '54.82'], ['episode:2438,subgoal:0,grid:4', 55, 70, '69.89', '70.87', '55.12', '54.81'], ['episode:2438,subgoal:0,grid:4', 65, 70, '69.80', '70.89', '65.88', '64.89'], ['episode:2439,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '39.20', '38.90'], ['episode:2439,subgoal:0,grid:2', 47, 56, '55.20', '56.85', '47.16', '46.81'], ['episode:2439,subgoal:0,grid:2', 44, 56, '55.80', '56.13', '44.17', '43.86'], ['episode:2439,subgoal:0,grid:4', 56, 67, '66.86', '67.90', '56.20', '55.86'], ['episode:2439,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.80'], ['episode:2439,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.83'], ['episode:2439,subgoal:0,grid:4', 63, 70, '69.80', '70.11', '63.86', '62.89']]

      ;
      let subgoal1_data =[['episode:2433,subgoal:1,grid:4', 68, 67, '66.83', '67.20', '68.81', '67.86'], ['episode:2433,subgoal:1,grid:5', 68, 63, '62.85', '63.17', '68.81', '67.14'], ['episode:2433,subgoal:1,grid:5', 62, 55, '54.82', '55.13', '62.83', '61.11'], ['episode:2434,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2434,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2435,subgoal:1,grid:5', 67, 65, '64.84', '65.20', '67.80', '66.10'], ['episode:2435,subgoal:1,grid:5', 68, 65, '64.83', '65.18', '68.80', '67.11'], ['episode:2436,subgoal:1,grid:5', 68, 65, '64.83', '65.17', '68.83', '67.12'], ['episode:2436,subgoal:1,grid:5', 61, 60, '59.10', '60.13', '61.81', '60.17'], ['episode:2437,subgoal:1,grid:5', 67, 65, '64.84', '65.20', '67.80', '66.10'], ['episode:2437,subgoal:1,grid:5', 68, 65, '64.83', '65.18', '68.80', '67.11'], ['episode:2438,subgoal:1,grid:5', 68, 63, '62.82', '63.16', '68.80', '67.12'], ['episode:2438,subgoal:1,grid:5', 68, 63, '62.14', '63.10', '68.80', '67.18'], ['episode:2439,subgoal:1,grid:5', 68, 65, '64.84', '65.16', '68.80', '67.13'], ['episode:2439,subgoal:1,grid:5', 68, 63, '62.83', '63.20', '68.83', '67.87']]

      ;
      let subgoal2_data = [['episode:2433,subgoal:2,grid:5', 68, 53, '52.80', '53.17', '68.18', '67.83'], ['episode:2433,subgoal:2,grid:6', 68, 49, '48.88', '49.80', '68.20', '67.16'], ['episode:2433,subgoal:2,grid:5', 66, 57, '56.18', '57.15', '66.15', '65.14'], ['episode:2433,subgoal:2,grid:6', 69, 49, '48.81', '49.20', '69.13', '68.84'], ['episode:2433,subgoal:2,grid:6', 61, 41, '40.81', '41.11', '61.87', '60.80'], ['episode:2433,subgoal:2,grid:6', 65, 35, '34.12', '35.83', '65.86', '64.20'], ['episode:2433,subgoal:2,grid:7', 67, 23, '22.80', '23.19', '67.80', '66.88'], ['episode:2434,subgoal:2,grid:5', 62, 59, '58.80', '59.85', '62.83', '61.18'], ['episode:2434,subgoal:2,grid:6', 63, 46, '45.80', '46.80', '63.12', '62.13'], ['episode:2434,subgoal:2,grid:6', 67, 45, '44.80', '45.16', '67.17', '66.83'], ['episode:2434,subgoal:2,grid:6', 68, 43, '42.81', '43.20', '68.18', '67.82'], ['episode:2435,subgoal:2,grid:5', 68, 53, '52.80', '53.19', '68.19', '67.80'], ['episode:2435,subgoal:2,grid:5', 68, 56, '55.80', '56.85', '68.88', '67.15'], ['episode:2435,subgoal:2,grid:5', 68, 56, '55.80', '56.80', '68.17', '67.10'], ['episode:2435,subgoal:2,grid:4', 68, 66, '65.12', '66.80', '68.90', '67.14'], ['episode:2435,subgoal:2,grid:5', 62, 60, '59.89', '60.80', '62.87', '61.86'], ['episode:2435,subgoal:2,grid:5', 60, 61, '60.80', '61.83', '60.80', '59.12'], ['episode:2435,subgoal:2,grid:4', 62, 70, '69.80', '70.83', '62.84', '61.20'], ['episode:2435,subgoal:2,grid:4', 62, 70, '69.15', '70.82', '62.11', '61.20'], ['episode:2435,subgoal:2,grid:4', 61, 66, '65.81', '66.12', '61.20', '60.85'], ['episode:2435,subgoal:2,grid:4', 60, 66, '65.87', '66.80', '60.16', '59.10'], ['episode:2435,subgoal:2,grid:4', 68, 69, '68.20', '69.15', '68.20', '67.82'], ['episode:2435,subgoal:2,grid:4', 62, 70, '69.88', '70.11', '62.20', '61.11'], ['episode:2435,subgoal:2,grid:4', 68, 70, '69.20', '70.89', '68.20', '67.19'], ['episode:2435,subgoal:2,grid:4', 68, 70, '69.88', '70.80', '68.20', '67.18'], ['episode:2435,subgoal:2,grid:5', 61, 62, '61.81', '62.89', '61.80', '60.19'], ['episode:2435,subgoal:2,grid:6', 68, 49, '48.80', '49.18', '68.89', '67.89'], ['episode:2435,subgoal:2,grid:6', 68, 38, '37.87', '38.13', '68.11', '67.20'], ['episode:2435,subgoal:2,grid:7', 61, 21, '20.12', '21.19', '61.86', '60.12'], ['episode:2436,subgoal:2,grid:5', 65, 59, '58.80', '59.89', '65.11', '64.18'], ['episode:2436,subgoal:2,grid:5', 62, 58, '57.85', '58.12', '62.13', '61.16'], ['episode:2436,subgoal:2,grid:5', 69, 62, '61.14', '62.11', '69.20', '68.89'], ['episode:2436,subgoal:2,grid:4', 62, 71, '70.18', '71.14', '62.87', '61.15'], ['episode:2436,subgoal:2,grid:3', 50, 71, '70.81', '71.89', '50.13', '49.87'], ['episode:2436,subgoal:2,grid:3', 50, 76, '75.86', '76.14', '50.80', '49.80'], ['episode:2436,subgoal:2,grid:4', 59, 71, '70.80', '71.14', '59.84', '58.85'], ['episode:2436,subgoal:2,grid:4', 64, 70, '69.85', '70.19', '64.10', '63.80'], ['episode:2436,subgoal:2,grid:4', 62, 70, '69.88', '70.87', '62.20', '61.87'], ['episode:2436,subgoal:2,grid:4', 63, 67, '66.80', '67.90', '63.89', '62.11'], ['episode:2436,subgoal:2,grid:4', 69, 68, '67.82', '68.20', '69.11', '68.83'], ['episode:2436,subgoal:2,grid:5', 68, 56, '55.83', '56.90', '68.86', '67.18'], ['episode:2436,subgoal:2,grid:4', 69, 70, '69.86', '70.11', '69.11', '68.80'], ['episode:2436,subgoal:2,grid:4', 61, 66, '65.20', '66.90', '61.16', '60.80'], ['episode:2436,subgoal:2,grid:6', 69, 49, '48.81', '49.20', '69.14', '68.83'], ['episode:2436,subgoal:2,grid:6', 66, 39, '38.14', '39.89', '66.83', '65.89'], ['episode:2436,subgoal:2,grid:7', 68, 25, '24.83', '25.88', '68.80', '67.88'], ['episode:2437,subgoal:2,grid:5', 68, 53, '52.80', '53.19', '68.19', '67.81'], ['episode:2437,subgoal:2,grid:5', 68, 60, '59.15', '60.86', '68.83', '67.20'], ['episode:2437,subgoal:2,grid:5', 65, 64, '63.20', '64.14', '65.10', '64.86'], ['episode:2437,subgoal:2,grid:4', 68, 68, '67.16', '68.82', '68.89', '67.20'], ['episode:2437,subgoal:2,grid:5', 68, 53, '52.88', '53.17', '68.80', '67.19'], ['episode:2437,subgoal:2,grid:6', 65, 47, '46.83', '47.81', '65.80', '64.15'], ['episode:2437,subgoal:2,grid:6', 62, 38, '37.80', '38.84', '62.80', '61.13'], ['episode:2437,subgoal:2,grid:6', 68, 38, '37.82', '38.14', '68.80', '67.11'], ['episode:2437,subgoal:2,grid:6', 68, 38, '37.85', '38.19', '68.80', '67.11'], ['episode:2437,subgoal:2,grid:6', 68, 38, '37.88', '38.11', '68.80', '67.12'], ['episode:2437,subgoal:2,grid:6', 68, 38, '37.87', '38.12', '68.80', '67.15'], ['episode:2438,subgoal:2,grid:5', 61, 56, '55.90', '56.87', '61.18', '60.80'], ['episode:2438,subgoal:2,grid:5', 66, 54, '53.16', '54.89', '66.90', '65.89'], ['episode:2438,subgoal:2,grid:5', 68, 54, '53.88', '54.17', '68.19', '67.80'], ['episode:2438,subgoal:2,grid:6', 68, 50, '49.80', '50.18', '68.14', '67.81'], ['episode:2438,subgoal:2,grid:6', 68, 46, '45.88', '46.85', '68.80', '67.12'], ['episode:2438,subgoal:2,grid:7', 62, 34, '33.84', '34.89', '62.80', '61.80'], ['episode:2438,subgoal:2,grid:7', 67, 26, '25.84', '26.10', '67.80', '66.14'], ['episode:2438,subgoal:2,grid:8', 62, 16, '15.17', '16.14', '62.86', '61.13'], ['episode:2439,subgoal:2,grid:5', 62, 53, '52.80', '53.17', '62.19', '61.85'], ['episode:2439,subgoal:2,grid:5', 66, 54, '53.87', '54.83', '66.20', '65.16'], ['episode:2439,subgoal:2,grid:4', 67, 66, '65.20', '66.81', '67.16', '66.80'], ['episode:2439,subgoal:2,grid:4', 64, 68, '67.84', '68.80', '64.11', '63.12'], ['episode:2439,subgoal:2,grid:4', 63, 71, '70.80', '71.90', '63.90', '62.19'], ['episode:2439,subgoal:2,grid:4', 62, 71, '70.11', '71.20', '62.82', '61.15'], ['episode:2439,subgoal:2,grid:4', 66, 70, '69.80', '70.20', '66.18', '65.85'], ['episode:2439,subgoal:2,grid:4', 68, 68, '67.80', '68.12', '68.17', '67.85'], ['episode:2439,subgoal:2,grid:4', 68, 68, '67.80', '68.83', '68.87', '67.90'], ['episode:2439,subgoal:2,grid:3', 53, 70, '69.20', '70.19', '53.87', '52.84'], ['episode:2439,subgoal:2,grid:3', 50, 71, '70.20', '71.19', '50.89', '49.12'], ['episode:2439,subgoal:2,grid:2', 46, 58, '57.83', '58.90', '46.10', '45.17'], ['episode:2439,subgoal:2,grid:2', 43, 58, '57.10', '58.13', '43.80', '42.80'], ['episode:2439,subgoal:2,grid:2', 43, 58, '57.90', '58.14', '43.80', '42.80'], ['episode:2439,subgoal:2,grid:1', 47, 41, '40.82', '41.90', '47.86', '46.16'], ['episode:2439,subgoal:2,grid:1', 39, 41, '40.20', '41.89', '39.12', '38.80'], ['episode:2439,subgoal:2,grid:1', 39, 41, '40.84', '41.80', '39.20', '38.84'], ['episode:2439,subgoal:2,grid:0', 37, 41, '40.14', '41.80', '37.17', '36.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.90', '41.15', '35.12', '34.82'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.11', '41.13', '35.12', '34.81'], ['episode:2439,subgoal:2,grid:1', 38, 42, '41.85', '42.20', '38.89', '37.88'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.90', '41.13', '35.15', '34.81'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.11', '41.16', '35.16', '34.83'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.13', '41.11', '35.88', '34.84'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.86', '41.14', '35.14', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.88', '41.17', '35.87', '34.85'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.10', '41.12', '35.12', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.12', '41.10', '35.11', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.12', '41.12', '35.11', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.12', '41.13', '35.14', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.84', '41.19', '35.90', '34.86'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.90', '41.12', '35.15', '34.82'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.89', '41.16', '35.15', '34.83'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.10', '41.13', '35.12', '34.83'], ['episode:2439,subgoal:2,grid:1', 38, 41, '40.11', '41.89', '38.89', '37.87'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.86', '41.16', '35.90', '34.87'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.88', '41.16', '35.12', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.11', '41.15', '35.11', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.14', '41.14', '35.88', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 41, '40.11', '41.14', '35.14', '34.80'], ['episode:2439,subgoal:2,grid:0', 35, 38, '37.83', '38.18', '35.20', '34.20'], ['episode:2439,subgoal:2,grid:7', 56, 24, '23.82', '24.20', '56.13', '55.20']]

      ;
      let subgoal3_data =[['episode:2432,subgoal:3,grid:7', 69, 34, '33.81', '34.87', '69.20', '68.87'], ['episode:2432,subgoal:3,grid:7', 62, 26, '25.83', '26.89', '62.20', '61.89'], ['episode:2432,subgoal:3,grid:8', 62, 12, '11.83', '12.86', '62.20', '61.89'], ['episode:2432,subgoal:3,grid:8', 69, 12, '11.80', '12.10', '69.17', '68.86'], ['episode:2432,subgoal:3,grid:7', 62, 20, '19.83', '20.10', '62.20', '61.89'], ['episode:2432,subgoal:3,grid:7', 62, 30, '29.80', '30.10', '62.15', '61.89'], ['episode:2433,subgoal:3,grid:8', 64, 12, '11.82', '12.87', '64.20', '63.87'], ['episode:2433,subgoal:3,grid:8', 65, 12, '11.84', '12.87', '65.20', '64.89'], ['episode:2433,subgoal:3,grid:8', 68, 12, '11.81', '12.87', '68.20', '67.86'], ['episode:2433,subgoal:3,grid:8', 69, 12, '11.80', '12.12', '69.20', '68.85'], ['episode:2433,subgoal:3,grid:8', 69, 12, '11.81', '12.12', '69.20', '68.88'], ['episode:2433,subgoal:3,grid:8', 65, 11, '10.80', '11.88', '65.20', '64.87'], ['episode:2433,subgoal:3,grid:7', 68, 20, '19.80', '20.10', '68.19', '67.85'], ['episode:2433,subgoal:3,grid:7', 69, 22, '21.80', '22.12', '69.20', '68.84'], ['episode:2433,subgoal:3,grid:7', 65, 34, '33.80', '34.89', '65.18', '64.87'], ['episode:2435,subgoal:3,grid:8', 64, 12, '11.83', '12.88', '64.20', '63.88'], ['episode:2435,subgoal:3,grid:8', 68, 12, '11.85', '12.85', '68.20', '67.10'], ['episode:2435,subgoal:3,grid:8', 62, 12, '11.80', '12.89', '62.20', '61.85'], ['episode:2435,subgoal:3,grid:8', 61, 12, '11.85', '12.10', '61.20', '60.88'], ['episode:2435,subgoal:3,grid:8', 63, 11, '10.80', '11.11', '63.18', '62.89'], ['episode:2435,subgoal:3,grid:8', 64, 11, '10.84', '11.88', '64.20', '63.89'], ['episode:2435,subgoal:3,grid:8', 65, 13, '12.82', '13.86', '65.20', '64.86'], ['episode:2435,subgoal:3,grid:8', 62, 11, '10.81', '11.11', '62.20', '61.85'], ['episode:2435,subgoal:3,grid:8', 62, 11, '10.80', '11.89', '62.18', '61.88'], ['episode:2435,subgoal:3,grid:8', 65, 11, '10.80', '11.90', '65.20', '64.84'], ['episode:2435,subgoal:3,grid:8', 65, 11, '10.83', '11.86', '65.20', '64.87'], ['episode:2435,subgoal:3,grid:8', 63, 12, '11.85', '12.89', '63.20', '62.88'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.80', '12.90', '65.20', '64.84'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.82', '12.12', '65.20', '64.86'], ['episode:2435,subgoal:3,grid:8', 66, 12, '11.80', '12.11', '66.18', '65.88'], ['episode:2435,subgoal:3,grid:8', 68, 12, '11.83', '12.88', '68.20', '67.87'], ['episode:2435,subgoal:3,grid:8', 62, 19, '18.81', '19.90', '62.20', '61.86'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.81', '12.13', '65.20', '64.88'], ['episode:2435,subgoal:3,grid:8', 64, 12, '11.80', '12.10', '64.19', '63.85'], ['episode:2435,subgoal:3,grid:8', 61, 12, '11.80', '12.10', '61.19', '60.84'], ['episode:2435,subgoal:3,grid:8', 61, 12, '11.81', '12.88', '61.20', '60.86'], ['episode:2435,subgoal:3,grid:8', 64, 12, '11.82', '12.12', '64.20', '63.85'], ['episode:2435,subgoal:3,grid:8', 61, 12, '11.84', '12.86', '61.20', '60.87'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.82', '12.13', '65.20', '64.84'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.81', '12.11', '65.20', '64.87'], ['episode:2435,subgoal:3,grid:8', 64, 12, '11.81', '12.11', '64.20', '63.86'], ['episode:2435,subgoal:3,grid:8', 66, 13, '12.81', '13.87', '66.20', '65.87'], ['episode:2435,subgoal:3,grid:8', 66, 15, '14.80', '15.11', '66.20', '65.89'], ['episode:2435,subgoal:3,grid:8', 62, 12, '11.83', '12.88', '62.20', '61.88'], ['episode:2435,subgoal:3,grid:8', 62, 12, '11.80', '12.11', '62.17', '61.84'], ['episode:2435,subgoal:3,grid:8', 64, 12, '11.80', '12.10', '64.20', '63.86'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.82', '12.10', '65.20', '64.87'], ['episode:2435,subgoal:3,grid:8', 68, 16, '15.82', '16.88', '68.20', '67.85'], ['episode:2435,subgoal:3,grid:8', 65, 12, '11.80', '12.13', '65.19', '64.85'], ['episode:2435,subgoal:3,grid:8', 68, 12, '11.81', '12.89', '68.20', '67.88'], ['episode:2435,subgoal:3,grid:7', 68, 23, '22.80', '23.14', '68.20', '67.87'], ['episode:2435,subgoal:3,grid:8', 62, 12, '11.80', '12.85', '62.19', '61.87'], ['episode:2435,subgoal:3,grid:7', 68, 21, '20.80', '21.88', '68.18', '67.90'], ['episode:2435,subgoal:3,grid:7', 68, 31, '30.81', '31.87', '68.20', '67.87'], ['episode:2435,subgoal:3,grid:7', 68, 22, '21.80', '22.15', '68.19', '67.85'], ['episode:2435,subgoal:3,grid:8', 64, 11, '10.82', '11.88', '64.20', '63.89'], ['episode:2435,subgoal:3,grid:8', 62, 11, '10.83', '11.11', '62.20', '61.87'], ['episode:2435,subgoal:3,grid:8', 62, 17, '16.80', '17.89', '62.20', '61.87'], ['episode:2435,subgoal:3,grid:8', 63, 11, '10.80', '11.11', '63.19', '62.85'], ['episode:2435,subgoal:3,grid:8', 62, 11, '10.80', '11.11', '62.20', '61.88'], ['episode:2435,subgoal:3,grid:8', 59, 11, '10.80', '11.88', '59.19', '58.11'], ['episode:2435,subgoal:3,grid:9', 54, 11, '10.82', '11.86', '54.20', '53.87'], ['episode:2435,subgoal:3,grid:9', 50, 11, '10.81', '11.89', '50.20', '49.11'], ['episode:2435,subgoal:3,grid:9', 50, 15, '14.80', '15.11', '50.19', '49.85'], ['episode:2436,subgoal:3,grid:8', 63, 18, '17.83', '18.90', '63.20', '62.89'], ['episode:2436,subgoal:3,grid:8', 61, 12, '11.83', '12.89', '61.20', '60.88'], ['episode:2436,subgoal:3,grid:7', 69, 30, '29.81', '30.89', '69.20', '68.88'], ['episode:2436,subgoal:3,grid:8', 65, 19, '18.80', '19.12', '65.19', '64.86'], ['episode:2436,subgoal:3,grid:8', 60, 17, '16.80', '17.10', '60.19', '59.88'], ['episode:2436,subgoal:3,grid:8', 68, 12, '11.80', '12.11', '68.20', '67.86'], ['episode:2436,subgoal:3,grid:8', 61, 12, '11.83', '12.88', '61.20', '60.87'], ['episode:2436,subgoal:3,grid:8', 60, 12, '11.80', '12.88', '60.18', '59.90'], ['episode:2436,subgoal:3,grid:8', 59, 12, '11.81', '12.88', '59.20', '58.87'], ['episode:2436,subgoal:3,grid:8', 56, 12, '11.82', '12.88', '56.20', '55.86'], ['episode:2436,subgoal:3,grid:9', 53, 12, '11.80', '12.90', '53.20', '52.87'], ['episode:2436,subgoal:3,grid:8', 55, 11, '10.85', '11.88', '55.20', '54.88'], ['episode:2436,subgoal:3,grid:9', 45, 12, '11.84', '12.88', '45.20', '44.88'], ['episode:2438,subgoal:3,grid:7', 62, 20, '19.82', '20.87', '62.20', '61.11'], ['episode:2438,subgoal:3,grid:8', 65, 15, '14.80', '15.89', '65.20', '64.88'], ['episode:2438,subgoal:3,grid:8', 62, 12, '11.80', '12.12', '62.17', '61.86'], ['episode:2438,subgoal:3,grid:8', 59, 12, '11.80', '12.85', '59.20', '58.10'], ['episode:2438,subgoal:3,grid:8', 58, 13, '12.80', '13.89', '58.18', '57.89'], ['episode:2438,subgoal:3,grid:8', 56, 12, '11.83', '12.87', '56.20', '55.88'], ['episode:2438,subgoal:3,grid:8', 56, 12, '11.81', '12.11', '56.20', '55.89'], ['episode:2438,subgoal:3,grid:9', 53, 12, '11.81', '12.88', '53.20', '52.89'], ['episode:2438,subgoal:3,grid:8', 55, 12, '11.80', '12.89', '55.20', '54.86'], ['episode:2438,subgoal:3,grid:9', 48, 20, '19.85', '20.88', '48.20', '47.89']]

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