import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public';
import { PieHalfDonutConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import cloneDeep from 'lodash/cloneDeep';

export const includes = ['legend'];

export const option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
    selectedMode: false,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
        formatter(param: any) {
          // correct the percentage
          return param.name + ' (' + param.percent * 2 + '%)';
        },
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735 + 580 + 484 + 300,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none',
            },
          },
          label: {
            show: false,
          },
        },
      ],
    },
  ],
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieHalfDonutConfig.key;

  public chartConfig = cloneDeep(PieHalfDonutConfig);

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes);
}