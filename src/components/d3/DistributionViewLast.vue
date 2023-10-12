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
      let subgoal0_data =[['episode:2754,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '39.20', '38.90'], ['episode:2754,subgoal:0,grid:2', 47, 56, '55.20', '56.85', '47.16', '46.81'], ['episode:2754,subgoal:0,grid:2', 44, 56, '55.80', '56.13', '44.17', '43.86'], ['episode:2754,subgoal:0,grid:4', 56, 67, '66.86', '67.90', '56.20', '55.86'], ['episode:2754,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.80'], ['episode:2754,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.83'], ['episode:2754,subgoal:0,grid:4', 63, 70, '69.80', '70.11', '63.86', '62.89'], ['episode:2755,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '33.20', '32.89'], ['episode:2755,subgoal:0,grid:2', 40, 53, '52.83', '53.80', '40.87', '39.90'], ['episode:2755,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.80'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.81', '70.87', '55.11', '54.11'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '55.20', '54.87'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.82'], ['episode:2755,subgoal:0,grid:4', 61, 68, '67.80', '68.14', '61.15', '60.86'], ['episode:2756,subgoal:0,grid:0', 31, 42, '41.89', '42.12', '31.20', '30.89'], ['episode:2756,subgoal:0,grid:2', 49, 58, '57.14', '58.88', '49.12', '48.20'], ['episode:2756,subgoal:0,grid:2', 39, 62, '61.80', '62.88', '39.80', '38.87'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.10', '70.84', '55.20', '54.11'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.85', '70.13', '55.20', '54.82'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.89', '70.87', '55.12', '54.81'], ['episode:2756,subgoal:0,grid:4', 65, 70, '69.80', '70.89', '65.88', '64.89'], ['episode:2757,subgoal:0,grid:1', 42, 50, '49.87', '50.87', '42.20', '41.80'], ['episode:2757,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.80'], ['episode:2757,subgoal:0,grid:4', 56, 67, '66.10', '67.80', '56.85', '55.11'], ['episode:2757,subgoal:0,grid:4', 55, 70, '69.88', '70.19', '55.17', '54.84'], ['episode:2757,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.18', '54.86'], ['episode:2757,subgoal:0,grid:4', 58, 70, '69.80', '70.89', '58.14', '57.13'], ['episode:2758,subgoal:0,grid:0', 27, 44, '43.83', '44.15', '27.11', '26.20'], ['episode:2758,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '49.20', '48.86'], ['episode:2758,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.80', '38.83'], ['episode:2758,subgoal:0,grid:4', 55, 70, '69.88', '70.89', '55.20', '54.90'], ['episode:2758,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.16', '55.85'], ['episode:2758,subgoal:0,grid:4', 55, 70, '69.85', '70.84', '55.12', '54.80'], ['episode:2758,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.85', '65.80'], ['episode:2759,subgoal:0,grid:1', 42, 50, '49.87', '50.87', '42.20', '41.80'], ['episode:2759,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.80'], ['episode:2759,subgoal:0,grid:4', 56, 67, '66.10', '67.80', '56.85', '55.11'], ['episode:2759,subgoal:0,grid:4', 55, 70, '69.88', '70.19', '55.17', '54.84'], ['episode:2759,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.18', '54.86'], ['episode:2759,subgoal:0,grid:4', 58, 70, '69.80', '70.89', '58.14', '57.13'], ['episode:2760,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '39.20', '38.90'], ['episode:2760,subgoal:0,grid:2', 47, 56, '55.20', '56.85', '47.16', '46.81'], ['episode:2760,subgoal:0,grid:2', 44, 56, '55.80', '56.13', '44.17', '43.86'], ['episode:2760,subgoal:0,grid:4', 56, 67, '66.86', '67.90', '56.20', '55.86'], ['episode:2760,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.80'], ['episode:2760,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.83'], ['episode:2760,subgoal:0,grid:4', 63, 70, '69.80', '70.11', '63.86', '62.89'], ['episode:2761,subgoal:0,grid:0', 27, 46, '45.89', '46.15', '27.80', '26.88'], ['episode:2761,subgoal:0,grid:2', 48, 58, '57.81', '58.19', '48.19', '47.81'], ['episode:2761,subgoal:0,grid:3', 44, 67, '66.14', '67.14', '44.81', '43.18'], ['episode:2761,subgoal:0,grid:4', 55, 70, '69.10', '70.14', '55.20', '54.90'], ['episode:2761,subgoal:0,grid:4', 55, 70, '69.88', '70.11', '55.18', '54.88'], ['episode:2761,subgoal:0,grid:4', 57, 69, '68.84', '69.14', '57.16', '56.86'], ['episode:2761,subgoal:0,grid:4', 66, 70, '69.80', '70.11', '66.88', '65.86'], ['episode:2762,subgoal:0,grid:1', 42, 50, '49.87', '50.87', '42.20', '41.80'], ['episode:2762,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.80'], ['episode:2762,subgoal:0,grid:4', 56, 67, '66.10', '67.80', '56.85', '55.11'], ['episode:2762,subgoal:0,grid:4', 55, 70, '69.88', '70.19', '55.17', '54.84'], ['episode:2762,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.18', '54.86'], ['episode:2762,subgoal:0,grid:4', 58, 70, '69.80', '70.89', '58.14', '57.13']]

      ;
      let subgoal1_data =[['episode:2753,subgoal:1,grid:5', 68, 63, '62.82', '63.16', '68.80', '67.12'], ['episode:2753,subgoal:1,grid:5', 68, 63, '62.14', '63.10', '68.80', '67.18'], ['episode:2754,subgoal:1,grid:5', 68, 65, '64.84', '65.16', '68.80', '67.13'], ['episode:2754,subgoal:1,grid:5', 68, 63, '62.83', '63.20', '68.83', '67.87'], ['episode:2755,subgoal:1,grid:5', 67, 65, '64.84', '65.20', '67.80', '66.10'], ['episode:2755,subgoal:1,grid:5', 68, 65, '64.83', '65.18', '68.80', '67.11'], ['episode:2756,subgoal:1,grid:5', 68, 63, '62.82', '63.16', '68.80', '67.12'], ['episode:2756,subgoal:1,grid:5', 68, 63, '62.14', '63.10', '68.80', '67.18'], ['episode:2757,subgoal:1,grid:4', 68, 67, '66.86', '67.18', '68.80', '67.12'], ['episode:2757,subgoal:1,grid:5', 68, 65, '64.84', '65.14', '68.80', '67.14'], ['episode:2758,subgoal:1,grid:5', 68, 65, '64.83', '65.16', '68.82', '67.12'], ['episode:2758,subgoal:1,grid:5', 65, 62, '61.89', '62.19', '65.80', '64.12'], ['episode:2759,subgoal:1,grid:4', 68, 67, '66.86', '67.18', '68.80', '67.12'], ['episode:2759,subgoal:1,grid:5', 68, 65, '64.84', '65.14', '68.80', '67.14'], ['episode:2760,subgoal:1,grid:5', 68, 65, '64.84', '65.16', '68.80', '67.13'], ['episode:2760,subgoal:1,grid:5', 68, 63, '62.83', '63.20', '68.83', '67.87'], ['episode:2761,subgoal:1,grid:5', 68, 65, '64.83', '65.17', '68.83', '67.12'], ['episode:2761,subgoal:1,grid:5', 61, 60, '59.10', '60.13', '61.81', '60.17'], ['episode:2762,subgoal:1,grid:4', 68, 67, '66.86', '67.18', '68.80', '67.12'], ['episode:2762,subgoal:1,grid:5', 68, 65, '64.84', '65.14', '68.80', '67.14']]

      ;
      let subgoal2_data = [['episode:2753,subgoal:2,grid:6', 69, 49, '48.80', '49.19', '69.18', '68.80'], ['episode:2753,subgoal:2,grid:5', 69, 59, '58.85', '59.20', '69.80', '68.17'], ['episode:2753,subgoal:2,grid:5', 65, 60, '59.89', '60.82', '65.20', '64.82'], ['episode:2753,subgoal:2,grid:5', 69, 51, '50.83', '51.20', '69.14', '68.85'], ['episode:2753,subgoal:2,grid:6', 68, 48, '47.80', '48.15', '68.14', '67.85'], ['episode:2753,subgoal:2,grid:6', 62, 41, '40.83', '41.13', '62.80', '61.11'], ['episode:2753,subgoal:2,grid:7', 65, 25, '24.14', '25.89', '65.12', '64.20'], ['episode:2754,subgoal:2,grid:6', 68, 49, '48.81', '49.17', '68.20', '67.80'], ['episode:2754,subgoal:2,grid:5', 65, 57, '56.84', '57.10', '65.89', '64.87'], ['episode:2754,subgoal:2,grid:5', 68, 57, '56.11', '57.82', '68.17', '67.85'], ['episode:2754,subgoal:2,grid:5', 68, 52, '51.80', '52.19', '68.85', '67.87'], ['episode:2754,subgoal:2,grid:5', 68, 53, '52.83', '53.20', '68.84', '67.87'], ['episode:2754,subgoal:2,grid:6', 62, 45, '44.85', '45.80', '62.80', '61.19'], ['episode:2754,subgoal:2,grid:7', 66, 25, '24.10', '25.20', '66.80', '65.18'], ['episode:2755,subgoal:2,grid:5', 68, 51, '50.80', '51.19', '68.18', '67.81'], ['episode:2755,subgoal:2,grid:5', 66, 53, '52.85', '53.19', '66.18', '65.88'], ['episode:2755,subgoal:2,grid:5', 62, 61, '60.12', '61.82', '62.20', '61.81'], ['episode:2755,subgoal:2,grid:5', 68, 55, '54.86', '55.16', '68.17', '67.80'], ['episode:2755,subgoal:2,grid:5', 62, 51, '50.11', '51.80', '62.14', '61.84'], ['episode:2755,subgoal:2,grid:6', 68, 48, '47.81', '48.80', '68.81', '67.11'], ['episode:2755,subgoal:2,grid:7', 62, 30, '29.13', '30.14', '62.14', '61.20'], ['episode:2755,subgoal:2,grid:8', 65, 12, '11.88', '12.11', '65.80', '64.10'], ['episode:2756,subgoal:2,grid:5', 69, 54, '53.81', '54.19', '69.20', '68.80'], ['episode:2756,subgoal:2,grid:5', 62, 53, '52.14', '53.16', '62.15', '61.80'], ['episode:2756,subgoal:2,grid:6', 65, 50, '49.85', '50.18', '65.12', '64.82'], ['episode:2756,subgoal:2,grid:5', 68, 53, '52.81', '53.17', '68.11', '67.86'], ['episode:2756,subgoal:2,grid:6', 69, 49, '48.82', '49.20', '69.13', '68.85'], ['episode:2756,subgoal:2,grid:6', 61, 43, '42.84', '43.80', '61.81', '60.85'], ['episode:2756,subgoal:2,grid:7', 68, 25, '24.80', '25.18', '68.80', '67.88'], ['episode:2757,subgoal:2,grid:6', 69, 50, '49.20', '50.87', '69.89', '68.11'], ['episode:2757,subgoal:2,grid:6', 69, 48, '47.89', '48.20', '69.19', '68.12'], ['episode:2757,subgoal:2,grid:6', 68, 42, '41.81', '42.16', '68.19', '67.80'], ['episode:2757,subgoal:2,grid:6', 69, 49, '48.81', '49.16', '69.87', '68.85'], ['episode:2757,subgoal:2,grid:6', 68, 49, '48.80', '49.19', '68.18', '67.85'], ['episode:2757,subgoal:2,grid:6', 68, 48, '47.80', '48.85', '68.80', '67.86'], ['episode:2757,subgoal:2,grid:7', 60, 29, '28.86', '29.11', '60.11', '59.80'], ['episode:2758,subgoal:2,grid:5', 66, 51, '50.80', '51.20', '66.20', '65.80'], ['episode:2758,subgoal:2,grid:6', 63, 48, '47.19', '48.84', '63.12', '62.86'], ['episode:2758,subgoal:2,grid:6', 68, 49, '48.81', '49.16', '68.11', '67.89'], ['episode:2758,subgoal:2,grid:6', 68, 47, '46.80', '47.16', '68.12', '67.83'], ['episode:2758,subgoal:2,grid:6', 68, 47, '46.80', '47.15', '68.12', '67.86'], ['episode:2758,subgoal:2,grid:6', 62, 41, '40.85', '41.85', '62.81', '61.82'], ['episode:2758,subgoal:2,grid:7', 68, 26, '25.84', '26.20', '68.80', '67.13'], ['episode:2759,subgoal:2,grid:6', 69, 50, '49.20', '50.86', '69.16', '68.83'], ['episode:2759,subgoal:2,grid:5', 69, 51, '50.83', '51.13', '69.20', '68.86'], ['episode:2759,subgoal:2,grid:6', 62, 50, '49.88', '50.15', '62.19', '61.20'], ['episode:2759,subgoal:2,grid:5', 68, 53, '52.80', '53.17', '68.11', '67.85'], ['episode:2759,subgoal:2,grid:5', 69, 53, '52.81', '53.20', '69.84', '68.10'], ['episode:2759,subgoal:2,grid:6', 68, 49, '48.80', '49.81', '68.80', '67.12'], ['episode:2759,subgoal:2,grid:7', 69, 31, '30.87', '31.12', '69.80', '68.90'], ['episode:2759,subgoal:2,grid:8', 64, 12, '11.86', '12.87', '64.80', '63.11'], ['episode:2760,subgoal:2,grid:6', 68, 50, '49.80', '50.19', '68.19', '67.80'], ['episode:2760,subgoal:2,grid:6', 65, 48, '47.85', '48.88', '65.12', '64.86'], ['episode:2760,subgoal:2,grid:6', 62, 48, '47.19', '48.80', '62.12', '61.18'], ['episode:2760,subgoal:2,grid:6', 68, 46, '45.80', '46.18', '68.14', '67.82'], ['episode:2760,subgoal:2,grid:6', 68, 48, '47.80', '48.17', '68.15', '67.81'], ['episode:2760,subgoal:2,grid:6', 62, 40, '39.88', '40.20', '62.80', '61.81'], ['episode:2760,subgoal:2,grid:7', 68, 23, '22.84', '23.20', '68.80', '67.89'], ['episode:2761,subgoal:2,grid:6', 62, 49, '48.81', '49.12', '62.88', '61.19'], ['episode:2761,subgoal:2,grid:6', 62, 48, '47.81', '48.16', '62.16', '61.88'], ['episode:2761,subgoal:2,grid:5', 61, 53, '52.86', '53.85', '61.15', '60.20'], ['episode:2761,subgoal:2,grid:6', 68, 48, '47.81', '48.16', '68.16', '67.81'], ['episode:2761,subgoal:2,grid:6', 68, 48, '47.80', '48.89', '68.80', '67.87'], ['episode:2761,subgoal:2,grid:6', 69, 37, '36.85', '37.14', '69.86', '68.20'], ['episode:2761,subgoal:2,grid:8', 60, 18, '17.20', '18.15', '60.11', '59.17'], ['episode:2762,subgoal:2,grid:5', 68, 52, '51.81', '52.80', '68.86', '67.86'], ['episode:2762,subgoal:2,grid:5', 61, 54, '53.86', '54.87', '61.16', '60.80'], ['episode:2762,subgoal:2,grid:6', 62, 50, '49.20', '50.87', '62.19', '61.17'], ['episode:2762,subgoal:2,grid:5', 61, 52, '51.20', '52.87', '61.83', '60.84'], ['episode:2762,subgoal:2,grid:6', 68, 50, '49.80', '50.20', '68.16', '67.83'], ['episode:2762,subgoal:2,grid:6', 66, 46, '45.83', '46.81', '66.80', '65.86'], ['episode:2762,subgoal:2,grid:7', 62, 29, '28.83', '29.13', '62.15', '61.80']]

      ;
      let subgoal3_data =[['episode:2753,subgoal:3,grid:8', 64, 12, '11.14', '12.11', '64.20', '63.82'], ['episode:2753,subgoal:3,grid:8', 61, 12, '11.20', '12.12', '61.11', '60.88'], ['episode:2753,subgoal:3,grid:8', 56, 15, '14.20', '15.90', '56.15', '55.87'], ['episode:2753,subgoal:3,grid:9', 54, 12, '11.20', '12.17', '54.11', '53.84'], ['episode:2753,subgoal:3,grid:8', 55, 12, '11.20', '12.17', '55.16', '54.85'], ['episode:2753,subgoal:3,grid:9', 51, 17, '16.17', '17.20', '51.80', '50.90'], ['episode:2754,subgoal:3,grid:8', 63, 15, '14.20', '15.86', '63.85', '62.11'], ['episode:2754,subgoal:3,grid:8', 65, 16, '15.20', '16.81', '65.88', '64.13'], ['episode:2754,subgoal:3,grid:8', 64, 12, '11.17', '12.81', '64.82', '63.20'], ['episode:2754,subgoal:3,grid:8', 62, 12, '11.20', '12.85', '62.84', '61.15'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.14', '12.14', '54.12', '53.12'], ['episode:2754,subgoal:3,grid:8', 56, 12, '11.20', '12.13', '56.83', '55.15'], ['episode:2754,subgoal:3,grid:8', 59, 12, '11.20', '12.20', '59.20', '58.82'], ['episode:2754,subgoal:3,grid:8', 61, 12, '11.20', '12.11', '61.10', '60.89'], ['episode:2754,subgoal:3,grid:8', 59, 12, '11.20', '12.19', '59.19', '58.83'], ['episode:2754,subgoal:3,grid:8', 60, 12, '11.20', '12.18', '60.19', '59.82'], ['episode:2754,subgoal:3,grid:8', 59, 12, '11.20', '12.11', '59.13', '58.84'], ['episode:2754,subgoal:3,grid:8', 56, 12, '11.20', '12.13', '56.86', '55.90'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.20', '12.17', '54.15', '53.13'], ['episode:2754,subgoal:3,grid:8', 57, 15, '14.20', '15.11', '57.20', '56.89'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.20', '12.80', '54.81', '53.19'], ['episode:2754,subgoal:3,grid:8', 56, 12, '11.20', '12.20', '56.19', '55.84'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.20', '12.90', '54.19', '53.80'], ['episode:2754,subgoal:3,grid:8', 55, 12, '11.20', '12.89', '55.87', '54.88'], ['episode:2754,subgoal:3,grid:8', 56, 12, '11.20', '12.16', '56.17', '55.85'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.12', '12.83', '54.20', '53.87'], ['episode:2755,subgoal:3,grid:8', 68, 12, '11.20', '12.82', '68.86', '67.20'], ['episode:2755,subgoal:3,grid:7', 61, 20, '19.83', '20.80', '61.20', '60.19'], ['episode:2755,subgoal:3,grid:8', 65, 12, '11.15', '12.90', '65.80', '64.13'], ['episode:2755,subgoal:3,grid:8', 63, 12, '11.20', '12.81', '63.81', '62.18'], ['episode:2755,subgoal:3,grid:8', 61, 12, '11.20', '12.90', '61.90', '60.11'], ['episode:2755,subgoal:3,grid:9', 50, 12, '11.13', '12.84', '50.81', '49.17'], ['episode:2755,subgoal:3,grid:9', 50, 15, '14.11', '15.15', '50.80', '49.13'], ['episode:2756,subgoal:3,grid:8', 63, 12, '11.20', '12.84', '63.83', '62.13'], ['episode:2756,subgoal:3,grid:8', 57, 12, '11.20', '12.12', '57.12', '56.85'], ['episode:2756,subgoal:3,grid:8', 57, 17, '16.20', '17.16', '57.19', '56.80'], ['episode:2756,subgoal:3,grid:8', 55, 12, '11.20', '12.17', '55.17', '54.80'], ['episode:2756,subgoal:3,grid:8', 55, 12, '11.20', '12.14', '55.20', '54.82'], ['episode:2757,subgoal:3,grid:8', 64, 12, '11.84', '12.86', '64.20', '63.20'], ['episode:2757,subgoal:3,grid:8', 60, 12, '11.20', '12.15', '60.14', '59.85'], ['episode:2757,subgoal:3,grid:8', 61, 12, '11.20', '12.11', '61.11', '60.90'], ['episode:2757,subgoal:3,grid:8', 56, 12, '11.20', '12.17', '56.18', '55.83'], ['episode:2757,subgoal:3,grid:9', 50, 9, '8.89', '9.19', '50.80', '49.14'], ['episode:2758,subgoal:3,grid:8', 63, 12, '11.11', '12.82', '63.87', '62.20'], ['episode:2758,subgoal:3,grid:8', 62, 16, '15.20', '16.12', '62.12', '61.89'], ['episode:2758,subgoal:3,grid:8', 57, 12, '11.20', '12.12', '57.19', '56.82'], ['episode:2758,subgoal:3,grid:8', 59, 12, '11.20', '12.15', '59.15', '58.85'], ['episode:2758,subgoal:3,grid:8', 60, 14, '13.20', '14.14', '60.14', '59.86'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.20', '12.10', '58.11', '57.88'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.20', '12.84', '58.87', '57.13'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.20', '12.86', '58.84', '57.16'], ['episode:2758,subgoal:3,grid:8', 56, 12, '11.20', '12.16', '56.10', '55.84'], ['episode:2758,subgoal:3,grid:8', 57, 16, '15.20', '16.13', '57.14', '56.88'], ['episode:2758,subgoal:3,grid:8', 55, 12, '11.90', '12.12', '55.17', '54.84'], ['episode:2758,subgoal:3,grid:8', 58, 15, '14.20', '15.14', '58.19', '57.82'], ['episode:2758,subgoal:3,grid:8', 56, 12, '11.20', '12.15', '56.18', '55.80'], ['episode:2758,subgoal:3,grid:8', 57, 12, '11.20', '12.12', '57.14', '56.85'], ['episode:2758,subgoal:3,grid:8', 59, 12, '11.20', '12.14', '59.13', '58.88'], ['episode:2758,subgoal:3,grid:8', 62, 12, '11.20', '12.13', '62.12', '61.89'], ['episode:2758,subgoal:3,grid:8', 63, 12, '11.20', '12.82', '63.82', '62.18'], ['episode:2758,subgoal:3,grid:8', 63, 12, '11.20', '12.85', '63.85', '62.13'], ['episode:2758,subgoal:3,grid:8', 55, 12, '11.14', '12.14', '55.89', '54.88'], ['episode:2758,subgoal:3,grid:8', 57, 15, '14.20', '15.13', '57.14', '56.87'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.89', '12.83', '58.80', '57.15'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.18', '12.87', '58.80', '57.14'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.20', '12.14', '58.85', '57.89'], ['episode:2758,subgoal:3,grid:8', 56, 12, '11.20', '12.14', '56.17', '55.81'], ['episode:2758,subgoal:3,grid:8', 56, 12, '11.20', '12.18', '56.18', '55.81'], ['episode:2758,subgoal:3,grid:8', 59, 12, '11.20', '12.13', '59.14', '58.87'], ['episode:2758,subgoal:3,grid:9', 50, 18, '17.82', '18.19', '50.20', '49.87'], ['episode:2759,subgoal:3,grid:8', 61, 12, '11.20', '12.13', '61.12', '60.88'], ['episode:2759,subgoal:3,grid:8', 61, 12, '11.20', '12.12', '61.11', '60.89'], ['episode:2759,subgoal:3,grid:8', 62, 12, '11.20', '12.13', '62.13', '61.89'], ['episode:2759,subgoal:3,grid:8', 62, 12, '11.20', '12.83', '62.84', '61.17'], ['episode:2759,subgoal:3,grid:8', 64, 12, '11.15', '12.80', '64.86', '63.14'], ['episode:2759,subgoal:3,grid:8', 61, 12, '11.20', '12.90', '61.12', '60.89'], ['episode:2759,subgoal:3,grid:8', 57, 12, '11.20', '12.13', '57.14', '56.11'], ['episode:2759,subgoal:3,grid:8', 57, 12, '11.20', '12.90', '57.87', '56.11'], ['episode:2759,subgoal:3,grid:9', 54, 12, '11.82', '12.17', '54.20', '53.81'], ['episode:2760,subgoal:3,grid:8', 65, 16, '15.15', '16.89', '65.19', '64.87'], ['episode:2760,subgoal:3,grid:8', 63, 15, '14.20', '15.84', '63.84', '62.16'], ['episode:2760,subgoal:3,grid:8', 61, 12, '11.20', '12.85', '61.85', '60.15'], ['episode:2760,subgoal:3,grid:8', 62, 12, '11.20', '12.83', '62.83', '61.17'], ['episode:2760,subgoal:3,grid:8', 57, 12, '11.20', '12.88', '57.84', '56.12'], ['episode:2760,subgoal:3,grid:8', 59, 12, '11.20', '12.10', '59.12', '58.88'], ['episode:2760,subgoal:3,grid:8', 56, 12, '11.20', '12.17', '56.88', '55.88'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.83', '12.15', '54.20', '53.87'], ['episode:2760,subgoal:3,grid:8', 56, 12, '11.20', '12.17', '56.13', '55.83'], ['episode:2760,subgoal:3,grid:8', 57, 12, '11.20', '12.16', '57.20', '56.83'], ['episode:2760,subgoal:3,grid:8', 56, 12, '11.20', '12.11', '56.89', '55.10'], ['episode:2760,subgoal:3,grid:8', 56, 12, '11.20', '12.19', '56.15', '55.81'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.88', '12.19', '54.20', '53.84'], ['episode:2760,subgoal:3,grid:8', 57, 15, '14.20', '15.14', '57.13', '56.88'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.12', '12.15', '54.19', '53.87'], ['episode:2760,subgoal:3,grid:9', 50, 13, '12.15', '13.82', '50.80', '49.17'], ['episode:2761,subgoal:3,grid:7', 65, 21, '20.83', '21.89', '65.88', '64.81'], ['episode:2761,subgoal:3,grid:6', 68, 35, '34.84', '35.20', '68.80', '67.17'], ['episode:2761,subgoal:3,grid:6', 62, 40, '39.82', '40.20', '62.89', '61.11'], ['episode:2761,subgoal:3,grid:7', 62, 26, '25.86', '26.81', '62.87', '61.20'], ['episode:2761,subgoal:3,grid:8', 68, 19, '18.83', '19.15', '68.19', '67.83'], ['episode:2762,subgoal:3,grid:8', 64, 12, '11.90', '12.80', '64.13', '63.19'], ['episode:2762,subgoal:3,grid:8', 58, 12, '11.89', '12.83', '58.85', '57.17'], ['episode:2762,subgoal:3,grid:8', 61, 12, '11.20', '12.19', '61.19', '60.81'], ['episode:2762,subgoal:3,grid:8', 57, 12, '11.20', '12.85', '57.83', '56.19'], ['episode:2762,subgoal:3,grid:8', 58, 12, '11.20', '12.18', '58.17', '57.84'], ['episode:2762,subgoal:3,grid:9', 54, 12, '11.19', '12.20', '54.15', '53.84'], ['episode:2762,subgoal:3,grid:8', 55, 12, '11.20', '12.15', '55.89', '54.80'], ['episode:2762,subgoal:3,grid:8', 55, 12, '11.20', '12.20', '55.14', '54.84'], ['episode:2762,subgoal:3,grid:9', 51, 15, '14.85', '15.20', '51.80', '50.86'], ['episode:2762,subgoal:3,grid:9', 43, 11, '10.86', '11.20', '43.80', '42.88']]

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