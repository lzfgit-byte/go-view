import { defineStore } from 'pinia';
import { CollectStoreStoreType } from './collectStoreStore.d';
import { ConfigType } from '@/packages/index.d';
import { addCollect, deleteCollect } from '@/api/path/collect.api';
import { JSONStringify } from '@/utils';
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
  },
});
