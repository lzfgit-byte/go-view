import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { MultiBarChartConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { JSONStringify } from '@/utils';
export const includes = ['legend', 'xAxis', 'yAxis', 'grid'];
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
    source: [],
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
