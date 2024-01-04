import { defineStore } from 'pinia';
import { CollectStoreStoreType } from './collectStoreStore.d';
import { ConfigType } from '@/packages/index.d';

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
      this.collects.push(config);
    },
    cancelCollect(config: ConfigType) {
      this.collects.splice(
        this.getCollects.findIndex((item) => item.key === config.key),
        1
      );
    },
    checkIsCollect(config: ConfigType): boolean {
      return this.collects.some((item: ConfigType) => item.key === config.key);
    },
  },
});
