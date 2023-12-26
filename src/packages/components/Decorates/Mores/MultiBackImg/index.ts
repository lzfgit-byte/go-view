import image from '@/assets/images/chart/decorates/weather_time.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
//TODO
export const MultiBackImgConfig: ConfigType = {
  key: 'MultiBackImg',
  chartKey: 'VMultiBackImg',
  conKey: 'VCMultiBackImg',
  title: '多背景',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image,
};
