import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { MultiBackImgConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  url: '',
  style: '',
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MultiBackImgConfig.key;
  public chartConfig = cloneDeep(MultiBackImgConfig);
  public option = cloneDeep(option);
}
