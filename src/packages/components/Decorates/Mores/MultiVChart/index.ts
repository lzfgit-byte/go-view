import image from '@/assets/images/chart/decorates/weather_time.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
//TODO 请在此处写入你的唯一值和展示图片
export const MultiVChartConfig: ConfigType = {
  key: 'MultiVChart',
  chartKey: 'VMultiVChart',
  conKey: 'VCMultiVChart',
  title: '动态图表',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image,
};
