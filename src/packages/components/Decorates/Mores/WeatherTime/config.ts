import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { WeatherTimeConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  color: '#CCC',
  dataset: 'aaaa',
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = WeatherTimeConfig.key;
  public chartConfig = cloneDeep(WeatherTimeConfig);
  public option = cloneDeep(option);
}
