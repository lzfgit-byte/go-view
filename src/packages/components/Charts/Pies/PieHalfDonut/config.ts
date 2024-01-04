import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { PieHalfDonutConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  //此处写配置项
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = PieHalfDonutConfig.key;
  public chartConfig = cloneDeep(PieHalfDonutConfig);
  public option = cloneDeep(option);
}
