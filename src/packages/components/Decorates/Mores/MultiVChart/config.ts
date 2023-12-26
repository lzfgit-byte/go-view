import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { MultiVChartConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  //此处写配置项
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MultiVChartConfig.key;
  public chartConfig = cloneDeep(MultiVChartConfig);
  public option = cloneDeep(option);
}
