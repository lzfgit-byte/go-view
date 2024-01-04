import { PackagesCategoryEnum } from '@/packages/index.d';
import { computed, onMounted, watchEffect } from 'vue';
import { collectListApi } from '@/api/path/collect.api';
import { JSONParse } from '@/utils';
import { useCollectStoreStore } from '@/store/modules/collectStoreStore/collectStoreStore';
import { MenuOptionsType } from '@/views/chart/ContentCharts/hooks/useAside.hook';

export default (menuOptions: MenuOptionsType[]) => {
  const collectStore = useCollectStoreStore();
  const collects = computed(() => collectStore.getCollects);
  //收藏
  watchEffect(() => {
    const index = menuOptions?.findIndex((i) => i.key === PackagesCategoryEnum.COLLECT);
    if (collects?.value?.length > -1 && index > -1) {
      menuOptions[index].list = collects.value;
    }
  });
  const initCollect = () => {
    collectListApi().then((res) => {
      collectStore.initCollect(res?.data?.map((item) => JSONParse(item?.value)) as any);
    });
  };
  onMounted(() => {
    initCollect();
  });
};
