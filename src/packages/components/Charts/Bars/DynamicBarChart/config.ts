import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { DynamicBarChartConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
export const includes = ['title', 'grid', 'xAxis', 'yAxis', 'series'];
const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();
const data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
const dataSet = { xAxis: [categories, categories2], series: [data, data2] };
const preOpt = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {
    show: true,
    type: 'scroll',
    x: 'center',
    y: 'top',
    icon: 'circle',
    orient: 'horizontal',
    textStyle: {
      color: '#B9B8CE',
      fontSize: 18,
    },
    itemHeight: 15,
    itemWidth: 15,
    pageTextStyle: {
      color: '#B9B8CE',
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
};
export const option = {
  //此处写配置项
  ...preOpt,
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: dataSet.xAxis[0],
    },
    {
      type: 'category',
      boundaryGap: true,
      data: dataSet.xAxis[1],
    },
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'Price',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: 'value',
      scale: true,
      name: 'Order',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: 'Dynamic Bar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: dataSet.series[0],
    },
    {
      name: 'Dynamic Line',
      type: 'line',
      data: dataSet.series[1],
    },
  ],
  title: {
    text: 'Dynamic Data',
    show: true,
    left: '0',
    top: '0',
    textStyle: {
      color: '#BFBFBF',
      fontSize: 18,
    },
    subtextStyle: {
      color: '#A2A2A2',
      fontSize: 14,
    },
  },
  grid: {
    show: false,
    left: '10%',
    top: '60',
    right: '10%',
    bottom: '60',
  },
  dataset: dataSet,
  loadDynamicData: { value: true },
};
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DynamicBarChartConfig.key;
  public chartConfig = cloneDeep(DynamicBarChartConfig);
  public option = cloneDeep(option);
}
