import image from '@/assets/images/chart/decorates/weather_time.png';
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
export const MultiBarChartConfig: ConfigType = {
  key: 'MultiBarChart',
  chartKey: 'VMultiBarChart',
  conKey: 'VCMultiBarChart',
  title: '动态配置图表',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  chartFrame: ChartFrameEnum.ECHARTS,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
