<template>
  <!-- 工作台相关 -->
  <div class="go-chart">
    <n-layout>
      <layout-header-pro>
        <template #left>
          <header-left-btn></header-left-btn>
        </template>
        <template #center>
          <header-title></header-title>
        </template>
        <template #ri-left>
          <header-right-btn></header-right-btn>
        </template>
      </layout-header-pro>
      <n-layout-content content-style="overflow:hidden; display: flex">
        <div style="overflow: hidden; display: flex">
          <content-charts></content-charts>
          <content-layers></content-layers>
        </div>
        <content-configurations></content-configurations>
      </n-layout-content>
    </n-layout>
  </div>
  <!-- 右键 -->
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="mousePosition.x"
    :y="mousePosition.y"
    :options="menuOptions"
    :show="chartEditStore.getRightMenuShow"
    :on-clickoutside="onClickOutSide"
    @select="handleMenuSelect"
  ></n-dropdown>
  <!-- 加载蒙层 -->
  <content-load></content-load>
</template>

<script setup lang="ts">
  import { loadAsyncComponent } from '@/utils';
  import { LayoutHeaderPro } from '@/layout/components/LayoutHeaderPro';
  import { useContextMenu } from './hooks/useContextMenu.hook';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
  import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore';

  const chartHistoryStoreStore = useChartHistoryStore();
  const chartEditStore = useChartEditStore();

  // 记录初始化
  chartHistoryStoreStore.canvasInit(chartEditStore.getEditCanvas);
  //头部左侧按钮
  const HeaderLeftBtn = loadAsyncComponent(() => import('./ContentHeader/headerLeftBtn/index.vue'));
  //头部右侧按钮
  const HeaderRightBtn = loadAsyncComponent(
    () => import('./ContentHeader/headerRightBtn/index.vue')
  );
  //标题
  const HeaderTitle = loadAsyncComponent(() => import('./ContentHeader/headerTitle/index.vue'));
  //图层 only
  const ContentLayers = loadAsyncComponent(() => import('./ContentLayers/index.vue'));
  //图表 带左侧切换按钮
  const ContentCharts = loadAsyncComponent(() => import('./ContentCharts/index.vue'));
  //画布主体
  const ContentConfigurations = loadAsyncComponent(
    () => import('./ContentConfigurations/index.vue')
  );
  //加载时的进度条
  const ContentLoad = loadAsyncComponent(() => import('./ContentLoad/index.vue'));

  // 右键
  const { menuOptions, onClickOutSide, mousePosition, handleMenuSelect } = useContextMenu();
</script>

<style lang="scss" scoped>
  @include go('chart') {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    @include background-image('background-image');
  }
</style>
