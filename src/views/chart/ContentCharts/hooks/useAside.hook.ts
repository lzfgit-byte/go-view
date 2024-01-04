import { ref, watch, computed, watchEffect, onMounted } from 'vue';
import { icon } from '@/plugins';
import { renderLang, renderIcon, JSONParse } from '@/utils';
import { themeColor, setItem, getCharts } from './useLayout.hook';
import { PackagesCategoryEnum, PackagesCategoryName, ConfigType } from '@/packages/index.d';
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore';
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';
import { useCollectStoreStore } from '@/store/modules/collectStoreStore/collectStoreStore';
import useCollectHook from '@/views/chart/ContentCharts/hooks/useCollect.hook';
// 图标
const { AirPlaneOutlineIcon, ImageIcon, BarChartIcon, StarOutlineIcon } = icon.ionicons5;
const { TableSplitIcon, RoadmapIcon, SpellCheckIcon, GraphicalDataFlowIcon } = icon.carbon;

// 图表
export type MenuOptionsType = {
  key: string;
  icon: ReturnType<typeof renderIcon>;
  label: ReturnType<typeof renderLang>;
  list: ConfigType[];
};

const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    icon: renderIcon(RoadmapIcon),
    label: PackagesCategoryName.CHARTS,
  },
  [PackagesCategoryEnum.INFORMATIONS]: {
    icon: renderIcon(SpellCheckIcon),
    label: PackagesCategoryName.INFORMATIONS,
  },
  [PackagesCategoryEnum.TABLES]: {
    icon: renderIcon(TableSplitIcon),
    label: PackagesCategoryName.TABLES,
  },
  [PackagesCategoryEnum.DECORATES]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: PackagesCategoryName.DECORATES,
  },
  [PackagesCategoryEnum.PHOTOS]: {
    icon: renderIcon(ImageIcon),
    label: PackagesCategoryName.PHOTOS,
  },
  [PackagesCategoryEnum.ICONS]: {
    icon: renderIcon(AirPlaneOutlineIcon),
    label: PackagesCategoryName.ICONS,
  },
  [PackagesCategoryEnum.COLLECT]: {
    icon: renderIcon(StarOutlineIcon),
    label: PackagesCategoryName.COLLECT,
  },
};
export const useAsideHook = () => {
  const packagesStore = usePackagesStore();
  const menuOptions: MenuOptionsType[] = [];

  // 处理列表
  const handlePackagesList = () => {
    for (const val in packagesStore.getPackagesList) {
      menuOptions.push({
        key: val,
        // @ts-ignore
        icon: packagesListObj[val].icon,
        // @ts-ignore
        label: packagesListObj[val].label,
        // @ts-ignore
        list: packagesStore.getPackagesList[val],
      });
    }
    console.log(menuOptions);
  };
  handlePackagesList();

  // 记录选中值
  let beforeSelect: string = menuOptions[0]['key'];
  const selectValue = ref<string>(menuOptions[0]['key']);

  // 选中的对象值
  const selectOptions = ref(menuOptions[0]);

  // 点击 item
  const clickItemHandle = (key: string, item: any) => {
    selectOptions.value = item;
    // 处理折叠
    if (beforeSelect === key) {
      setItem(ChartLayoutStoreEnum.CHARTS, !getCharts.value, false);
    } else {
      setItem(ChartLayoutStoreEnum.CHARTS, true, false);
    }
    beforeSelect = key;
  };
  useCollectHook(menuOptions);
  return {
    getCharts,
    BarChartIcon,
    themeColor,
    selectOptions,
    selectValue,
    clickItemHandle,
    menuOptions,
  };
};
