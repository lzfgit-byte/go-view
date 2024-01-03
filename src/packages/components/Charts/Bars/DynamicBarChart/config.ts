import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { DynamicBarChartConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  //此处写配置项
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DynamicBarChartConfig.key;
  public chartConfig = cloneDeep(DynamicBarChartConfig);
  public option = cloneDeep(option);
}
