import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { MultiBarChartConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { JSONStringify } from '@/utils';
export const includes = ['legend', 'xAxis', 'yAxis', 'grid'];
const source = [
  {
    product: 'Mon',
    data1: 120,
    data2: 130,
  },
  {
    product: 'Tue',
    data1: 200,
    data2: 130,
  },
  {
    product: 'Wed',
    data1: 150,
    data2: 312,
  },
  {
    product: 'Thu',
    data1: 80,
    data2: 268,
  },
  {
    product: 'Fri',
    data1: 70,
    data2: 155,
  },
  {
    product: 'Sat',
    data1: 110,
    data2: 117,
  },
  {
    product: 'Sun',
    data1: 130,
    data2: 160,
  },
];
const seriesItem = {
  type: 'bar',
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12,
  },
  itemStyle: {
    color: null,
    borderRadius: 2,
  },
};
const preOpt = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow',
    },
  },
  xAxis: {
    show: true,
    type: 'category',
  },
  yAxis: {
    show: true,
    type: 'value',
  },
  dataset: {
    source: source,
  },
  series: [seriesItem, seriesItem],
};
export const option = {
  echartsOpts: JSONStringify(preOpt),
  dataset: [],
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MultiBarChartConfig.key;
  public chartConfig = cloneDeep(MultiBarChartConfig);
  public option = cloneDeep(option);
}
