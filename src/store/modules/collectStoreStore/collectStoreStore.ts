import { defineStore } from 'pinia';
import { CollectStoreStoreType } from './collectStoreStore.d';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { addCollect, deleteCollect } from '@/api/path/collect.api';
import { JSONStringify } from '@/utils';
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index';
import { ChatCategoryEnum } from '@/packages/components/Photos/index.d';
const notCollect = [
  {
    key: ImageConfig.key,
    category: ChatCategoryEnum.PRIVATE,
    package: PackagesCategoryEnum.PHOTOS,
  },
];
export const useCollectStoreStore = defineStore({
  id: 'useCollectStoreStore',
  state: (): CollectStoreStoreType => ({
    collects: [],
  }),
  getters: {
    getCollects(): ConfigType[] {
      return this.collects;
    },
  },
  actions: {
    addCollect(config: ConfigType) {
      this.collects.splice(0, 0, config);
      addCollect({ value: JSONStringify(config) });
    },
    initCollect(config: ConfigType[]) {
      this.collects.push(...config);
    },
    cancelCollect(config: ConfigType) {
      this.collects.splice(
        this.getCollects.findIndex((item) => item.key === config.key),
        1
      );
      deleteCollect({ value: JSONStringify(config) });
    },
    checkIsCollect(config: ConfigType): boolean {
      return this.collects.some(
        (item: ConfigType) => item.key + item.title === config.key + config.title
      );
    },
    canCollect(config: ConfigType) {
      return !notCollect.some((item) => {
        return (
          item.key === config.key &&
          item.category === config.category &&
          item.package === config.package
        );
      });
    },
  },
});
