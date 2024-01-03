import image from '@/assets/images/chart/charts/bar-dynamic-chart.png';
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';

export const DynamicBarChartConfig: ConfigType = {
  key: 'DynamicBarChart',
  chartKey: 'VDynamicBarChart',
  conKey: 'VCDynamicBarChart',
  title: '动态数据图表',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  chartFrame: ChartFrameEnum.ECHARTS,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
