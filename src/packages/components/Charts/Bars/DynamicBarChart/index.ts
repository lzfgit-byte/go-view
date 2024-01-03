import image from '@/assets/images/chart/decorates/weather_time.png';
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
//TODO 请在此处写入你的唯一值和展示图片
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
