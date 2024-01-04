import image from '@/assets/images/chart/charts/pie-half-donut.png';
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
export const PieHalfDonutConfig: ConfigType = {
  key: 'PieHalfDonut',
  chartKey: 'VPieHalfDonut',
  conKey: 'VCPieHalfDonut',
  title: '半环图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  chartFrame: ChartFrameEnum.ECHARTS,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
