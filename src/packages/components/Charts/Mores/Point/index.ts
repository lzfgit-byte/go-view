import image from '@/assets/images/chart/charts/Point.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d';
//TODO 水波图
export const PointConfig: ConfigType = {
  key: 'Point',
  chartKey: 'VPoint',
  conKey: 'VCPoint',
  title: '水波图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
