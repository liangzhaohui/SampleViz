<template>
  <div id="distribution-view" class="container"> </div>
</template>

<script>
  // 引入基本模板
  import * as echarts from 'echarts';
  import Vue from "vue";
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
  const dimensions = [
    'name', 'y', 'x', 'x min', 'x max', 'y min', 'y max'
  ];
  let subgoal0_data =[['episode:2754,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '40.00', '38.90'], ['episode:2754,subgoal:0,grid:2', 47, 56, '56.00', '56.05', '47.16', '46.01'], ['episode:2754,subgoal:0,grid:2', 44, 56, '55.00', '56.13', '44.17', '43.86'], ['episode:2754,subgoal:0,grid:4', 56, 67, '66.86', '67.10', '57.00', '55.86'], ['episode:2754,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.00'], ['episode:2754,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.03'], ['episode:2754,subgoal:0,grid:4', 63, 70, '69.00', '70.11', '63.06', '62.89'], ['episode:2755,subgoal:0,grid:0', 33, 42, '41.89', '42.12', '34.00', '32.89'], ['episode:2755,subgoal:0,grid:2', 40, 53, '52.03', '53.00', '40.07', '39.90'], ['episode:2755,subgoal:0,grid:2', 46, 58, '57.81', '58.18', '46.20', '45.00'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.01', '70.07', '55.11', '54.91'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.85', '70.19', '56.00', '54.87'], ['episode:2755,subgoal:0,grid:4', 55, 70, '69.89', '70.12', '55.14', '54.02'], ['episode:2755,subgoal:0,grid:4', 61, 68, '67.00', '68.14', '61.15', '60.86'], ['episode:2756,subgoal:0,grid:0', 31, 42, '41.89', '42.12', '32.00', '30.89'], ['episode:2756,subgoal:0,grid:2', 49, 58, '57.94', '58.08', '49.92', '49.00'], ['episode:2756,subgoal:0,grid:2', 39, 62, '61.00', '62.08', '39.00', '38.87'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.90', '70.04', '56.00', '54.91'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.85', '70.13', '56.00', '54.82'], ['episode:2756,subgoal:0,grid:4', 55, 70, '69.89', '70.07', '55.12', '54.01'], ['episode:2756,subgoal:0,grid:4', 65, 70, '69.00', '70.09', '65.08', '64.89'], ['episode:2757,subgoal:0,grid:1', 42, 50, '49.87', '50.07', '42.20', '41.00'], ['episode:2757,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.00'], ['episode:2757,subgoal:0,grid:4', 56, 67, '66.10', '67.00', '56.05', '55.91'], ['episode:2757,subgoal:0,grid:4', 55, 70, '69.88', '70.99', '55.17', '54.84'], ['episode:2757,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.98', '54.86'], ['episode:2757,subgoal:0,grid:4', 58, 70, '69.00', '70.09', '58.14', '57.93'], ['episode:2758,subgoal:0,grid:0', 27, 44, '43.03', '44.15', '27.11', '27.00'], ['episode:2758,subgoal:0,grid:2', 49, 58, '57.83', '58.13', '50.00', '48.86'], ['episode:2758,subgoal:0,grid:2', 39, 64, '63.85', '64.10', '39.00', '38.03'], ['episode:2758,subgoal:0,grid:4', 55, 70, '69.88', '70.09', '56.00', '54.90'], ['episode:2758,subgoal:0,grid:4', 56, 68, '67.87', '68.10', '56.96', '55.85'], ['episode:2758,subgoal:0,grid:4', 55, 70, '69.85', '70.04', '55.12', '54.00'], ['episode:2758,subgoal:0,grid:4', 66, 68, '67.83', '68.13', '66.05', '65.00'], ['episode:2759,subgoal:0,grid:1', 42, 50, '49.87', '50.07', '42.20', '41.00'], ['episode:2759,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.00'], ['episode:2759,subgoal:0,grid:4', 56, 67, '66.10', '67.00', '56.05', '55.91'], ['episode:2759,subgoal:0,grid:4', 55, 70, '69.88', '70.99', '55.17', '54.84'], ['episode:2759,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.98', '54.86'], ['episode:2759,subgoal:0,grid:4', 58, 70, '69.00', '70.09', '58.14', '57.93'], ['episode:2760,subgoal:0,grid:1', 39, 41, '40.89', '41.12', '40.00', '38.90'], ['episode:2760,subgoal:0,grid:2', 47, 56, '56.00', '56.05', '47.16', '46.01'], ['episode:2760,subgoal:0,grid:2', 44, 56, '55.00', '56.13', '44.17', '43.86'], ['episode:2760,subgoal:0,grid:4', 56, 67, '66.86', '67.10', '57.00', '55.86'], ['episode:2760,subgoal:0,grid:4', 55, 70, '69.81', '70.19', '55.15', '54.00'], ['episode:2760,subgoal:0,grid:4', 57, 67, '66.86', '67.13', '57.12', '56.03'], ['episode:2760,subgoal:0,grid:4', 63, 70, '69.00', '70.11', '63.06', '62.89'], ['episode:2761,subgoal:0,grid:0', 27, 46, '45.89', '46.95', '27.00', '26.88'], ['episode:2761,subgoal:0,grid:2', 48, 58, '57.81', '58.99', '48.19', '47.81'], ['episode:2761,subgoal:0,grid:3', 44, 67, '66.94', '67.94', '44.01', '43.98'], ['episode:2761,subgoal:0,grid:4', 55, 70, '69.90', '70.14', '56.00', '54.90'], ['episode:2761,subgoal:0,grid:4', 55, 70, '69.88', '70.11', '55.98', '54.88'], ['episode:2761,subgoal:0,grid:4', 57, 69, '68.84', '69.14', '57.96', '56.86'], ['episode:2761,subgoal:0,grid:4', 66, 70, '69.00', '70.11', '66.08', '65.86'], ['episode:2762,subgoal:0,grid:1', 42, 50, '49.87', '50.07', '42.20', '41.00'], ['episode:2762,subgoal:0,grid:2', 46, 58, '57.81', '58.17', '46.19', '45.00'], ['episode:2762,subgoal:0,grid:4', 56, 67, '66.10', '67.00', '56.05', '55.91'], ['episode:2762,subgoal:0,grid:4', 55, 70, '69.88', '70.99', '55.17', '54.84'], ['episode:2762,subgoal:0,grid:4', 55, 70, '69.86', '70.14', '55.98', '54.86'], ['episode:2762,subgoal:0,grid:4', 58, 70, '69.00', '70.09', '58.14', '57.93']]

  ;
  let subgoal1_data =[['episode:2753,subgoal:1,grid:5', 68, 63, '62.02', '63.16', '68.00', '67.92'], ['episode:2753,subgoal:1,grid:5', 68, 63, '62.94', '63.90', '68.00', '67.98'], ['episode:2754,subgoal:1,grid:5', 68, 65, '64.84', '65.96', '68.00', '67.93'], ['episode:2754,subgoal:1,grid:5', 68, 63, '62.83', '64.00', '68.03', '67.87'], ['episode:2755,subgoal:1,grid:5', 67, 65, '64.84', '66.00', '67.00', '66.90'], ['episode:2755,subgoal:1,grid:5', 68, 65, '64.83', '65.98', '68.00', '67.91'], ['episode:2756,subgoal:1,grid:5', 68, 63, '62.02', '63.16', '68.00', '67.92'], ['episode:2756,subgoal:1,grid:5', 68, 63, '62.94', '63.90', '68.00', '67.98'], ['episode:2757,subgoal:1,grid:4', 68, 67, '66.86', '67.98', '68.00', '67.92'], ['episode:2757,subgoal:1,grid:5', 68, 65, '64.04', '65.14', '68.00', '67.94'], ['episode:2758,subgoal:1,grid:5', 68, 65, '64.03', '65.16', '68.02', '67.92'], ['episode:2758,subgoal:1,grid:5', 65, 62, '61.89', '62.99', '65.00', '64.92'], ['episode:2759,subgoal:1,grid:4', 68, 67, '66.86', '67.98', '68.00', '67.92'], ['episode:2759,subgoal:1,grid:5', 68, 65, '64.04', '65.14', '68.00', '67.94'], ['episode:2760,subgoal:1,grid:5', 68, 65, '64.84', '65.96', '68.00', '67.93'], ['episode:2760,subgoal:1,grid:5', 68, 63, '62.83', '64.00', '68.03', '67.87'], ['episode:2761,subgoal:1,grid:5', 68, 65, '64.03', '65.17', '68.03', '67.92'], ['episode:2761,subgoal:1,grid:5', 61, 60, '59.90', '60.93', '61.01', '60.97'], ['episode:2762,subgoal:1,grid:4', 68, 67, '66.86', '67.98', '68.00', '67.92'], ['episode:2762,subgoal:1,grid:5', 68, 65, '64.04', '65.14', '68.00', '67.94']]

  ;
  let subgoal2_data =[['episode:2753,subgoal:2,grid:6', 69, 49, '48.00', '49.19', '69.18', '68.80'], ['episode:2753,subgoal:2,grid:5', 69, 59, '58.85', '60.00', '69.00', '68.97'], ['episode:2753,subgoal:2,grid:5', 65, 60, '59.89', '60.02', '66.00', '64.82'], ['episode:2753,subgoal:2,grid:5', 69, 51, '50.83', '52.00', '69.14', '68.85'], ['episode:2753,subgoal:2,grid:6', 68, 48, '47.00', '48.15', '68.14', '67.85'], ['episode:2753,subgoal:2,grid:6', 62, 41, '40.03', '41.13', '62.00', '61.91'], ['episode:2753,subgoal:2,grid:7', 65, 25, '24.94', '25.09', '65.92', '65.00'], ['episode:2754,subgoal:2,grid:6', 68, 49, '48.81', '49.17', '68.20', '67.00'], ['episode:2754,subgoal:2,grid:5', 65, 57, '56.04', '57.10', '65.09', '64.87'], ['episode:2754,subgoal:2,grid:5', 68, 57, '56.91', '57.02', '68.97', '67.85'], ['episode:2754,subgoal:2,grid:5', 68, 52, '51.00', '52.19', '68.05', '67.87'], ['episode:2754,subgoal:2,grid:5', 68, 53, '52.83', '54.00', '68.04', '67.87'], ['episode:2754,subgoal:2,grid:6', 62, 45, '44.05', '45.00', '62.00', '61.99'], ['episode:2754,subgoal:2,grid:7', 66, 25, '24.90', '26.00', '66.00', '65.98'], ['episode:2755,subgoal:2,grid:5', 68, 51, '50.00', '51.19', '68.18', '67.81'], ['episode:2755,subgoal:2,grid:5', 66, 53, '52.85', '53.99', '66.18', '65.88'], ['episode:2755,subgoal:2,grid:5', 62, 61, '60.92', '61.02', '63.00', '61.81'], ['episode:2755,subgoal:2,grid:5', 68, 55, '54.86', '55.16', '68.17', '67.00'], ['episode:2755,subgoal:2,grid:5', 62, 51, '50.91', '51.00', '62.14', '61.04'], ['episode:2755,subgoal:2,grid:6', 68, 48, '47.01', '48.00', '68.01', '67.91'], ['episode:2755,subgoal:2,grid:7', 62, 30, '29.93', '30.14', '62.94', '62.00'], ['episode:2755,subgoal:2,grid:8', 65, 12, '11.08', '12.11', '65.00', '64.90'], ['episode:2756,subgoal:2,grid:5', 69, 54, '53.81', '54.19', '69.20', '68.00'], ['episode:2756,subgoal:2,grid:5', 62, 53, '52.94', '53.16', '62.15', '61.00'], ['episode:2756,subgoal:2,grid:6', 65, 50, '49.85', '50.18', '65.12', '64.02'], ['episode:2756,subgoal:2,grid:5', 68, 53, '52.01', '53.17', '68.11', '67.86'], ['episode:2756,subgoal:2,grid:6', 69, 49, '48.82', '50.00', '69.13', '68.85'], ['episode:2756,subgoal:2,grid:6', 61, 43, '42.04', '43.00', '61.01', '60.85'], ['episode:2756,subgoal:2,grid:7', 68, 25, '24.00', '25.18', '68.00', '67.88'], ['episode:2757,subgoal:2,grid:6', 69, 50, '50.00', '50.07', '69.09', '68.11'], ['episode:2757,subgoal:2,grid:6', 69, 48, '47.89', '49.00', '69.19', '68.92'], ['episode:2757,subgoal:2,grid:6', 68, 42, '41.81', '42.16', '68.19', '67.00'], ['episode:2757,subgoal:2,grid:6', 69, 49, '48.01', '49.16', '69.07', '68.85'], ['episode:2757,subgoal:2,grid:6', 68, 49, '48.00', '49.19', '68.18', '67.85'], ['episode:2757,subgoal:2,grid:6', 68, 48, '47.00', '48.05', '68.00', '67.86'], ['episode:2757,subgoal:2,grid:7', 60, 29, '28.86', '29.11', '60.11', '59.00'], ['episode:2758,subgoal:2,grid:5', 66, 51, '50.80', '51.20', '66.20', '65.00'], ['episode:2758,subgoal:2,grid:6', 63, 48, '47.99', '48.04', '63.12', '62.06'], ['episode:2758,subgoal:2,grid:6', 68, 49, '48.01', '49.16', '68.11', '67.89'], ['episode:2758,subgoal:2,grid:6', 68, 47, '46.00', '47.16', '68.12', '67.83'], ['episode:2758,subgoal:2,grid:6', 68, 47, '46.00', '47.15', '68.12', '67.86'], ['episode:2758,subgoal:2,grid:6', 62, 41, '40.85', '41.05', '62.01', '61.02'], ['episode:2758,subgoal:2,grid:7', 68, 26, '25.84', '27.00', '68.00', '67.93'], ['episode:2759,subgoal:2,grid:6', 69, 50, '50.00', '50.06', '69.16', '68.03'], ['episode:2759,subgoal:2,grid:5', 69, 51, '50.83', '51.13', '70.00', '68.86'], ['episode:2759,subgoal:2,grid:6', 62, 50, '49.88', '50.15', '62.99', '62.00'], ['episode:2759,subgoal:2,grid:5', 68, 53, '52.00', '53.17', '68.11', '67.85'], ['episode:2759,subgoal:2,grid:5', 69, 53, '52.81', '54.00', '69.04', '68.90'], ['episode:2759,subgoal:2,grid:6', 68, 49, '48.00', '49.01', '68.00', '67.92'], ['episode:2759,subgoal:2,grid:7', 69, 31, '30.07', '31.12', '69.00', '68.90'], ['episode:2759,subgoal:2,grid:8', 64, 12, '11.06', '12.07', '64.00', '63.91'], ['episode:2760,subgoal:2,grid:6', 68, 50, '49.00', '50.19', '68.19', '67.80'], ['episode:2760,subgoal:2,grid:6', 65, 48, '47.05', '48.08', '65.12', '64.86'], ['episode:2760,subgoal:2,grid:6', 62, 48, '47.99', '48.00', '62.92', '61.98'], ['episode:2760,subgoal:2,grid:6', 68, 46, '45.00', '46.18', '68.14', '67.82'], ['episode:2760,subgoal:2,grid:6', 68, 48, '47.00', '48.17', '68.15', '67.81'], ['episode:2760,subgoal:2,grid:6', 62, 40, '39.88', '41.00', '62.00', '61.81'], ['episode:2760,subgoal:2,grid:7', 68, 23, '22.84', '24.00', '68.00', '67.89'], ['episode:2761,subgoal:2,grid:6', 62, 49, '48.01', '49.12', '62.08', '61.99'], ['episode:2761,subgoal:2,grid:6', 62, 48, '47.01', '48.16', '62.16', '61.88'], ['episode:2761,subgoal:2,grid:5', 61, 53, '52.86', '53.05', '61.95', '61.00'], ['episode:2761,subgoal:2,grid:6', 68, 48, '47.01', '48.16', '68.16', '67.81'], ['episode:2761,subgoal:2,grid:6', 68, 48, '47.00', '48.09', '68.00', '67.87'], ['episode:2761,subgoal:2,grid:6', 69, 37, '36.05', '37.14', '69.06', '69.00'], ['episode:2761,subgoal:2,grid:8', 60, 18, '18.00', '18.95', '60.11', '59.97'], ['episode:2762,subgoal:2,grid:5', 68, 52, '51.01', '52.00', '68.06', '67.86'], ['episode:2762,subgoal:2,grid:5', 61, 54, '53.86', '54.07', '61.16', '60.00'], ['episode:2762,subgoal:2,grid:6', 62, 50, '50.00', '50.07', '62.99', '61.97'], ['episode:2762,subgoal:2,grid:5', 61, 52, '52.00', '52.07', '61.03', '60.04'], ['episode:2762,subgoal:2,grid:6', 68, 50, '49.00', '50.20', '68.16', '67.83'], ['episode:2762,subgoal:2,grid:6', 66, 46, '45.03', '46.01', '66.00', '65.86'], ['episode:2762,subgoal:2,grid:7', 62, 29, '28.83', '29.13', '62.15', '61.00']]

  ;
  let subgoal3_data =[['episode:2753,subgoal:3,grid:8', 64, 12, '11.94', '12.11', '65.00', '63.82'], ['episode:2753,subgoal:3,grid:8', 61, 12, '12.00', '12.12', '61.11', '60.08'], ['episode:2753,subgoal:3,grid:8', 56, 15, '15.00', '15.10', '56.95', '55.87'], ['episode:2753,subgoal:3,grid:9', 54, 12, '12.00', '12.97', '54.11', '53.84'], ['episode:2753,subgoal:3,grid:8', 55, 12, '12.00', '12.97', '55.16', '54.85'], ['episode:2753,subgoal:3,grid:9', 51, 17, '16.97', '18.00', '51.00', '50.90'], ['episode:2754,subgoal:3,grid:8', 63, 15, '15.00', '15.06', '63.05', '62.11'], ['episode:2754,subgoal:3,grid:8', 65, 16, '16.00', '16.01', '65.88', '64.93'], ['episode:2754,subgoal:3,grid:8', 64, 12, '11.17', '12.01', '64.02', '64.00'], ['episode:2754,subgoal:3,grid:8', 62, 12, '12.00', '12.05', '62.04', '61.15'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.94', '12.94', '54.12', '53.92'], ['episode:2754,subgoal:3,grid:8', 56, 12, '12.00', '12.93', '56.03', '55.95'], ['episode:2754,subgoal:3,grid:8', 59, 12, '12.00', '13.00', '59.20', '58.82'], ['episode:2754,subgoal:3,grid:8', 61, 12, '12.00', '12.11', '61.10', '60.09'], ['episode:2754,subgoal:3,grid:8', 59, 12, '12.00', '12.99', '59.19', '58.83'], ['episode:2754,subgoal:3,grid:8', 60, 12, '12.00', '12.18', '60.99', '59.82'], ['episode:2754,subgoal:3,grid:8', 59, 12, '12.00', '12.11', '59.13', '58.04'], ['episode:2754,subgoal:3,grid:8', 56, 12, '12.00', '12.93', '56.06', '55.90'], ['episode:2754,subgoal:3,grid:9', 54, 12, '12.00', '12.97', '54.15', '53.93'], ['episode:2754,subgoal:3,grid:8', 57, 15, '15.00', '15.11', '58.00', '56.89'], ['episode:2754,subgoal:3,grid:9', 54, 12, '12.00', '12.00', '54.01', '53.19'], ['episode:2754,subgoal:3,grid:8', 56, 12, '12.00', '13.00', '56.19', '55.84'], ['episode:2754,subgoal:3,grid:9', 54, 12, '12.00', '12.10', '54.19', '53.00'], ['episode:2754,subgoal:3,grid:8', 55, 12, '12.00', '12.09', '55.07', '54.08'], ['episode:2754,subgoal:3,grid:8', 56, 12, '12.00', '12.16', '56.97', '55.85'], ['episode:2754,subgoal:3,grid:9', 54, 12, '11.92', '12.03', '55.00', '53.87'], ['episode:2755,subgoal:3,grid:8', 68, 12, '12.00', '12.02', '68.86', '68.00'], ['episode:2755,subgoal:3,grid:7', 61, 20, '19.83', '20.00', '62.00', '60.99'], ['episode:2755,subgoal:3,grid:8', 65, 12, '11.95', '12.90', '65.00', '64.93'], ['episode:2755,subgoal:3,grid:8', 63, 12, '12.00', '12.01', '63.01', '62.18'], ['episode:2755,subgoal:3,grid:8', 61, 12, '12.00', '12.10', '61.90', '60.91'], ['episode:2755,subgoal:3,grid:9', 50, 12, '11.13', '12.04', '50.01', '49.97'], ['episode:2755,subgoal:3,grid:9', 50, 15, '14.91', '15.95', '50.00', '49.93'], ['episode:2756,subgoal:3,grid:8', 63, 12, '12.00', '12.04', '63.03', '62.13'], ['episode:2756,subgoal:3,grid:8', 57, 12, '12.00', '12.12', '57.12', '56.05'], ['episode:2756,subgoal:3,grid:8', 57, 17, '17.00', '17.16', '57.19', '56.00'], ['episode:2756,subgoal:3,grid:8', 55, 12, '12.00', '12.17', '55.17', '54.00'], ['episode:2756,subgoal:3,grid:8', 55, 12, '12.00', '12.14', '56.00', '54.82'], ['episode:2757,subgoal:3,grid:8', 64, 12, '11.84', '12.06', '65.00', '64.00'], ['episode:2757,subgoal:3,grid:8', 60, 12, '12.00', '12.95', '60.14', '59.85'], ['episode:2757,subgoal:3,grid:8', 61, 12, '12.00', '12.11', '61.91', '60.90'], ['episode:2757,subgoal:3,grid:8', 56, 12, '12.00', '12.17', '56.98', '55.83'], ['episode:2757,subgoal:3,grid:9', 50, 9, '8.89', '9.99', '50.00', '49.94'], ['episode:2758,subgoal:3,grid:8', 63, 12, '11.11', '12.02', '63.07', '63.00'], ['episode:2758,subgoal:3,grid:8', 62, 16, '16.00', '16.12', '62.92', '61.89'], ['episode:2758,subgoal:3,grid:8', 57, 12, '12.00', '12.12', '57.99', '56.82'], ['episode:2758,subgoal:3,grid:8', 59, 12, '12.00', '12.15', '59.95', '58.85'], ['episode:2758,subgoal:3,grid:8', 60, 14, '14.00', '14.94', '60.14', '59.86'], ['episode:2758,subgoal:3,grid:8', 58, 12, '12.00', '12.10', '58.11', '57.08'], ['episode:2758,subgoal:3,grid:8', 58, 12, '12.00', '12.04', '58.07', '57.13'], ['episode:2758,subgoal:3,grid:8', 58, 12, '12.00', '12.86', '58.04', '57.96'], ['episode:2758,subgoal:3,grid:8', 56, 12, '12.00', '12.16', '56.10', '55.04'], ['episode:2758,subgoal:3,grid:8', 57, 16, '16.00', '16.13', '57.94', '56.88'], ['episode:2758,subgoal:3,grid:8', 55, 12, '11.90', '12.12', '55.97', '54.84'], ['episode:2758,subgoal:3,grid:8', 58, 15, '15.00', '15.14', '58.99', '57.82'], ['episode:2758,subgoal:3,grid:8', 56, 12, '12.00', '12.15', '56.18', '55.00'], ['episode:2758,subgoal:3,grid:8', 57, 12, '12.00', '12.12', '57.14', '56.05'], ['episode:2758,subgoal:3,grid:8', 59, 12, '12.00', '12.94', '59.13', '58.88'], ['episode:2758,subgoal:3,grid:8', 62, 12, '12.00', '12.93', '62.12', '61.89'], ['episode:2758,subgoal:3,grid:8', 63, 12, '12.00', '12.82', '63.02', '62.98'], ['episode:2758,subgoal:3,grid:8', 63, 12, '12.00', '12.05', '63.05', '62.13'], ['episode:2758,subgoal:3,grid:8', 55, 12, '11.94', '12.94', '55.09', '54.88'], ['episode:2758,subgoal:3,grid:8', 57, 15, '15.00', '15.13', '57.94', '56.87'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.09', '12.03', '58.00', '57.95'], ['episode:2758,subgoal:3,grid:8', 58, 12, '11.98', '12.87', '58.00', '57.94'], ['episode:2758,subgoal:3,grid:8', 58, 12, '12.00', '12.94', '58.05', '57.89'], ['episode:2758,subgoal:3,grid:8', 56, 12, '12.00', '12.14', '56.17', '55.01'], ['episode:2758,subgoal:3,grid:8', 56, 12, '12.00', '12.18', '56.18', '55.01'], ['episode:2758,subgoal:3,grid:8', 59, 12, '12.00', '12.13', '59.94', '58.87'], ['episode:2758,subgoal:3,grid:9', 50, 18, '17.82', '18.19', '51.00', '49.87'], ['episode:2759,subgoal:3,grid:8', 61, 12, '12.00', '12.93', '61.12', '60.88'], ['episode:2759,subgoal:3,grid:8', 61, 12, '12.00', '12.92', '61.11', '60.89'], ['episode:2759,subgoal:3,grid:8', 62, 12, '12.00', '12.13', '62.93', '61.89'], ['episode:2759,subgoal:3,grid:8', 62, 12, '12.00', '12.03', '62.84', '61.97'], ['episode:2759,subgoal:3,grid:8', 64, 12, '11.95', '12.00', '64.86', '63.94'], ['episode:2759,subgoal:3,grid:8', 61, 12, '12.00', '12.10', '61.92', '60.89'], ['episode:2759,subgoal:3,grid:8', 57, 12, '12.00', '12.13', '57.94', '56.91'], ['episode:2759,subgoal:3,grid:8', 57, 12, '12.00', '12.90', '57.07', '56.91'], ['episode:2759,subgoal:3,grid:9', 54, 12, '11.82', '12.17', '55.00', '53.81'], ['episode:2760,subgoal:3,grid:8', 65, 16, '15.95', '16.09', '65.99', '64.87'], ['episode:2760,subgoal:3,grid:8', 63, 15, '15.00', '15.84', '63.04', '62.96'], ['episode:2760,subgoal:3,grid:8', 61, 12, '12.00', '12.05', '61.05', '60.15'], ['episode:2760,subgoal:3,grid:8', 62, 12, '12.00', '12.83', '62.03', '61.97'], ['episode:2760,subgoal:3,grid:8', 57, 12, '12.00', '12.88', '57.04', '56.92'], ['episode:2760,subgoal:3,grid:8', 59, 12, '12.00', '12.10', '59.92', '58.88'], ['episode:2760,subgoal:3,grid:8', 56, 12, '12.00', '12.97', '56.08', '55.88'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.83', '12.15', '55.00', '53.87'], ['episode:2760,subgoal:3,grid:8', 56, 12, '12.00', '12.97', '56.13', '55.83'], ['episode:2760,subgoal:3,grid:8', 57, 12, '12.00', '12.16', '58.00', '56.83'], ['episode:2760,subgoal:3,grid:8', 56, 12, '12.00', '12.91', '56.09', '55.90'], ['episode:2760,subgoal:3,grid:8', 56, 12, '12.00', '12.99', '56.15', '55.81'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.88', '12.19', '55.00', '53.84'], ['episode:2760,subgoal:3,grid:8', 57, 15, '15.00', '15.94', '57.13', '56.88'], ['episode:2760,subgoal:3,grid:9', 54, 12, '11.92', '12.15', '54.99', '53.87'], ['episode:2760,subgoal:3,grid:9', 50, 13, '12.15', '13.02', '50.00', '49.97'], ['episode:2761,subgoal:3,grid:7', 65, 21, '20.83', '21.09', '65.08', '64.01'], ['episode:2761,subgoal:3,grid:6', 68, 35, '34.84', '36.00', '68.00', '67.97'], ['episode:2761,subgoal:3,grid:6', 62, 40, '39.82', '41.00', '62.09', '61.91'], ['episode:2761,subgoal:3,grid:7', 62, 26, '25.06', '26.01', '62.07', '62.00'], ['episode:2761,subgoal:3,grid:8', 68, 19, '18.83', '19.15', '68.99', '67.83'], ['episode:2762,subgoal:3,grid:8', 64, 12, '11.90', '12.00', '64.93', '63.99'], ['episode:2762,subgoal:3,grid:8', 58, 12, '11.09', '12.03', '58.05', '57.97'], ['episode:2762,subgoal:3,grid:8', 61, 12, '12.00', '12.99', '61.19', '60.81'], ['episode:2762,subgoal:3,grid:8', 57, 12, '12.00', '12.85', '57.03', '56.99'], ['episode:2762,subgoal:3,grid:8', 58, 12, '12.00', '12.98', '58.17', '57.84'], ['episode:2762,subgoal:3,grid:9', 54, 12, '11.99', '13.00', '54.15', '53.84'], ['episode:2762,subgoal:3,grid:8', 55, 12, '12.00', '12.15', '55.09', '54.00'], ['episode:2762,subgoal:3,grid:8', 55, 12, '12.00', '13.00', '55.14', '54.84'], ['episode:2762,subgoal:3,grid:9', 51, 15, '14.85', '16.00', '51.00', '50.86'], ['episode:2762,subgoal:3,grid:9', 43, 11, '10.86', '12.00', '43.00', '42.88']]

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
              //params.seriesName +
              //' :<br/>' +
              params.value[0] //+
              //'cm ' +
              //params.value[1] //+
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
      icon: 'rect',
      data: ['N0','F0', 'N1','F1', 'N2','F2', 'N3','F3'],
      textStyle: {
        //图例字体大小
        fontSize: 12,
      },
      //图例大小
      itemHeight: 12,
      itemWidth: 12,
      //图例滚动显示
      //type: 'scroll',
      right: 0,
      top: 218,
      //设置图例为垂直布局，分为两行
      orient: 'vertical',
      itemGap: 10, //图例项之间的距离
      align: 'left', //图例的水平对齐方式
      padding: [0, 10, 0, 0] //图例组件的内边距，如：[top, right, bottom, left]
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle:{
            width: 0,
            type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
          },
        },
        position:'top',
        scale: true,
        interval: 15 ,
        min:5, // 起始
        max:80,// 终止
        axisLabel: {
          formatter: '{value} '
        },
        splitLine :{    //网格线
          lineStyle:{
            type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
          },
          show:true //隐藏或显示
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle:{
            width: 0,
            type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
          },
        },
        inverse:true,
        scale: true,
        interval: 15 ,
        min:40, // 起始
        max:70,// 终止
        axisLabel: {
          formatter: '{value} '
        },
        splitLine :{    //网格线
          lineStyle:{
            type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
          },
          show:true //隐藏或显示
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
        name: 'F0',
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
        name: 'F1',
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
        name: 'F2',
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
        name: 'F3',
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
        name: 'N0',
        data: subgoal0_data,
        dimensions: dimensions,
        encode: {
          x: 2,
          y: 1,
          tooltip: [2, 1, 3, 4, 5, 6],
          itemName: 0
        },
        symbol: 'rect',
        symbolSize: 8,
        itemStyle: {
          color: '#d7191c'//#8dd3c7
        }
      },
      {
        type: 'scatter',
        name: 'N1',
        data: subgoal1_data,
        dimensions: dimensions,
        encode: {
          x: 2,
          y: 1,
          tooltip: [2, 1, 3, 4, 5, 6],
          itemName: 0
        },
        symbol: 'rect',
        symbolSize: 8,
        itemStyle: {
          color: '#fdae61'//#8dd3c7
        }
      },
      {
        type: 'scatter',
        name: 'N2',
        data: subgoal2_data,
        dimensions: dimensions,
        encode: {
          x: 2,
          y: 1,
          tooltip: [2, 1, 3, 4, 5, 6],
          itemName: 0
        },
        symbol: 'rect',
        symbolSize: 8,
        itemStyle: {
          color: '#abdda4'//#8dd3c7
        }
      },
      {
        type: 'scatter',
        name: 'N3',
        data: subgoal3_data,
        dimensions: dimensions,
        encode: {
          x: 2,
          y: 1,
          tooltip: [2, 1, 3, 4, 5, 6],
          itemName: 0
        },
        symbol: 'rect',
        symbolSize: 8,
        itemStyle: {
          color: '#2b83ba'//#8dd3c7
        }
      }

    ]
  }
  let cood = [0,0,0,0]
  export default {
    name: "distribution-view",
    props: {
      cood: {
        type: Array,
        default: () => [0, 0, 0, 0]
      }
    },

    methods: {
      handleCood() {
        this.$emit('coodChanged', this.cood)
        //console.log(this.cood)
      }
    },
    mounted(){
     //初始化图表
      const chartObj = echarts.init(document.getElementById('distribution-view'))
      chartObj.setOption(option)

      chartObj.on('brushEnd', (params) => {
        //console.log(params.areas[0].range[0])
        //console.log(params.areas[0].range[1])
        this.cood[0] = params.areas[0].range[0][0]
        this.cood[1] = params.areas[0].range[0][1]
        this.cood[2] = params.areas[0].range[1][0]
        this.cood[3] = params.areas[0].range[1][1]
        //console.log(this.cood)
        this.handleCood();
      });
    },
    watch: {

    }
  }
</script>
<style scoped>
  .container{width: 100%;height: 100%;}
</style>