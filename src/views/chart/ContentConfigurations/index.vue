<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <!-- 图表拖拽区域,目标区域，画板 -->
      <ContentEdit></ContentEdit>
    </n-layout-content>
    <!--  画布主体的右侧配置栏  -->
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="0"
      :width="350"
      :collapsed="collapsed"
      :native-scrollbar="false"
      show-trigger="bar"
      @collapse="collapsedHandle"
      @expand="expandHandle"
    >
      <ContentBox class="go-content-configurations go-boderbox" :show-top="false" :depth="2">
        <!-- 页面配置 -->
        <n-tabs v-if="!selectTarget" class="tabs-box" size="small" type="segment">
          <n-tab-pane
            v-for="item in globalTabList"
            :key="item.key"
            :name="item.key"
            size="small"
            display-directive="show:lazy"
          >
            <template #tab>
              <n-space>
                <span>{{ item.title }}</span>
                <n-icon size="16" class="icon-position">
                  <component :is="item.icon"></component>
                </n-icon>
              </n-space>
            </template>
            <component :is="item.render"></component>
          </n-tab-pane>
        </n-tabs>
        <!--  页面配置结束  -->

        <!-- 编辑，选中组件时展示 -->
        <n-tabs
          v-if="selectTarget"
          v-model:value="tabsSelect"
          class="tabs-box"
          size="small"
          type="segment"
        >
          <n-tab-pane
            v-for="item in selectTarget.isGroup ? chartsDefaultTabList : chartsTabList"
            :key="item.key"
            :name="item.key"
            size="small"
            display-directive="show:lazy"
          >
            <template #tab>
              <n-space>
                <span>{{ item.title }}</span>
                <n-icon size="16" class="icon-position">
                  <component :is="item.icon"></component>
                </n-icon>
              </n-space>
            </template>
            <component :is="item.render"></component>
          </n-tab-pane>
        </n-tabs>
      </ContentBox>
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs, watch } from 'vue';
  import { ContentBox } from '../ContentBox/index';
  import { TabsEnum } from './index.d';
  import { icon } from '@/plugins';
  import { loadAsyncComponent } from '@/utils';
  import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore';
  import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';

  const { getDetails } = toRefs(useChartLayoutStore());
  const { setItem } = useChartLayoutStore();
  const chartEditStore = useChartEditStore();

  const { ConstructIcon, FlashIcon, DesktopOutlineIcon, LeafIcon, RocketIcon } = icon.ionicons5;

  const ContentEdit = loadAsyncComponent(() => import('../ContentEdit/index.vue'));
  const CanvasPage = loadAsyncComponent(() => import('./components/CanvasPage/index.vue'));
  const ChartSetting = loadAsyncComponent(() => import('./components/ChartSetting/index.vue'));
  const ChartData = loadAsyncComponent(() => import('./components/ChartData/index.vue'));
  const ChartEvent = loadAsyncComponent(() => import('./components/ChartEvent/index.vue'));
  const ChartAnimation = loadAsyncComponent(() => import('./components/ChartAnimation/index.vue'));

  const collapsed = ref<boolean>(getDetails.value);
  const tabsSelect = ref<TabsEnum>(TabsEnum.CHART_SETTING);

  const collapsedHandle = () => {
    collapsed.value = true;
    setItem(ChartLayoutStoreEnum.DETAILS, true);
  };

  const expandHandle = () => {
    collapsed.value = false;
    setItem(ChartLayoutStoreEnum.DETAILS, false);
  };

  const selectTarget = computed(() => {
    const selectId = chartEditStore.getTargetChart.selectId;
    // 排除多个
    if (selectId.length !== 1) {
      return undefined;
    }
    const target = chartEditStore.componentList[chartEditStore.fetchTargetIndex()];
    if (target?.isGroup) {
      //分组被选中时tab变少，所以重置回第一个
      tabsSelect.value = TabsEnum.CHART_SETTING;
    }
    return target;
  });

  watch(getDetails, (newData) => {
    if (newData) {
      collapsedHandle();
    } else {
      expandHandle();
    }
  });

  // 页面设置
  const globalTabList = [
    {
      key: TabsEnum.PAGE_SETTING,
      title: '页面配置',
      icon: DesktopOutlineIcon,
      render: CanvasPage,
    },
  ];

  const chartsDefaultTabList = [
    {
      key: TabsEnum.CHART_SETTING,
      title: '定制',
      icon: ConstructIcon,
      render: ChartSetting,
    },
    {
      key: TabsEnum.CHART_ANIMATION,
      title: '动画',
      icon: LeafIcon,
      render: ChartAnimation,
    },
  ];

  const chartsTabList = [
    ...chartsDefaultTabList,
    {
      key: TabsEnum.CHART_DATA,
      title: '数据',
      icon: FlashIcon,
      render: ChartData,
    },
    {
      key: TabsEnum.CHART_EVENT,
      title: '事件',
      icon: RocketIcon,
      render: ChartEvent,
    },
  ];
</script>

<style lang="scss" scoped>
  @include go(content-configurations) {
    overflow: hidden;
    .tabs-box {
      padding: 10px;
      .icon-position {
        padding-top: 2px;
      }
    }
  }
</style>
