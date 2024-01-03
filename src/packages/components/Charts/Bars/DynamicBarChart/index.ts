import image from '@/assets/images/chart/charts/bar-dynamic-chart.png';
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';

export const DynamicBarChartConfig: ConfigType = {
  key: 'DynamicBarChart',
  chartKey: 'VDynamicBarChart',
  conKey: 'VCDynamicBarChart',
  title: 'DynamicBarChart',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  chartFrame: ChartFrameEnum.ECHARTS,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
