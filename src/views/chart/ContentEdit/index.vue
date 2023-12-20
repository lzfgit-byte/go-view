<template>
  <!-- <edit-rule></edit-rule> -->
  <ContentBox
    id="go-chart-edit-layout"
    :flex="true"
    :show-top="false"
    :show-bottom="true"
    :depth="1"
    :x-scroll="true"
    :disabled-scroll="true"
    @mousedown="mousedownHandleUnStop"
    @drop="dragHandle"
    @dragover="dragoverHandle"
    @dragenter="dragoverHandle"
  >
    <EditRule>
      <!-- 画布主体 -->
      <div id="go-chart-edit-content" @contextmenu="handleContextMenu">
        <!-- 展示 -->
        <EditRange>
          <!-- 滤镜预览 -->
          <div
            :style="{
              ...getFilterStyle(chartEditStore.getEditCanvasConfig),
              ...rangeStyle,
            }"
          >
            <!-- 图表 -->
            <div v-for="(item, index) in chartEditStore.getComponentList" :key="item.id">
              <!-- 分组 -->
              <EditGroup
                v-if="item.isGroup"
                :group-data="(item as CreateComponentGroupType)"
                :group-index="index"
              ></EditGroup>

              <!-- 单组件 -->
              <EditShapeBox
                v-else
                :data-id="item.id"
                :index="index"
                :style="{
                ...useComponentStyle(item.attr, index),
                ...getBlendModeStyle(item.styles) as any
              }"
                :item="item"
                @click="mouseClickHandle($event, item)"
                @mousedown="mousedownHandle($event, item)"
                @mouseenter="mouseenterHandle($event, item)"
                @mouseleave="mouseleaveHandle($event, item)"
                @contextmenu="handleContextMenu($event, item, optionsHandle)"
              >
                <component
                  :is="item.chartConfig.chartKey"
                  class="edit-content-chart"
                  :class="animationsClass(item.styles.animations)"
                  :chart-config="item"
                  :theme-setting="themeSetting"
                  :theme-color="themeColor"
                  :style="{
                    ...useSizeStyle(item.attr),
                    ...getFilterStyle(item.styles),
                    ...getTransformStyle(item.styles),
                  }"
                ></component>
              </EditShapeBox>
            </div>
          </div>
        </EditRange>
      </div>
    </EditRule>

    <!-- 工具栏 -->
    <template #aside>
      <EditTools></EditTools>
    </template>

    <!-- 底部控制 -->
    <template #bottom>
      <EditBottom></EditBottom>
    </template>
  </ContentBox>
</template>

<script lang="ts" setup>
  import { computed, onMounted, provide } from 'vue';
  import { useAddKeyboard } from '../hooks/useKeyboard.hook';
  import { useSync } from '../hooks/useSync.hook';
  import { ContentBox } from '../ContentBox/index';
  import { useLayout } from './hooks/useLayout.hook';
  import {
    dragHandle,
    dragoverHandle,
    mousedownHandleUnStop,
    useMouseHandle,
  } from './hooks/useDrag.hook';
  import { useComponentStyle, useSizeStyle } from './hooks/useStyle.hook';

  import { EditGroup } from './components/EditGroup';
  import { EditRange } from './components/EditRange';
  import { EditRule } from './components/EditRule';
  import { EditBottom } from './components/EditBottom';
  import { EditShapeBox } from './components/EditShapeBox';
  import { EditTools } from './components/EditTools';
  import { SCALE_KEY } from '@/views/preview/hooks/useScale.hook';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
  import type { MenuOptionsItemType } from '@/views/chart/hooks/useContextMenu.hook.d';
  import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook';
  import {
    addWindowUnload,
    animationsClass,
    colorCustomMerge,
    getBlendModeStyle,
    getFilterStyle,
    getTransformStyle,
  } from '@/utils';
  import type { CreateComponentGroupType, CreateComponentType } from '@/packages/index.d';
  import { MenuEnum } from '@/enums/editPageEnum';
  import { chartColors } from '@/settings/chartThemes/index';

  const chartEditStore = useChartEditStore();
  const { handleContextMenu } = useContextMenu();
  const { dataSyncFetch, intervalDataSyncUpdate } = useSync();

  // 加入网页关闭提示 TODO,取消刷新拦截
  addWindowUnload()();

  // 编辑时注入scale变量，消除警告
  provide(SCALE_KEY, null);

  // 布局处理
  useLayout(async () => {});

  // 点击事件
  const { mouseenterHandle, mouseleaveHandle, mousedownHandle, mouseClickHandle } =
    useMouseHandle();

  // 右键事件
  const optionsHandle = (
    targetList: MenuOptionsItemType[],
    allList: MenuOptionsItemType[],
    targetInstance: CreateComponentType
  ) => {
    // 多选处理
    if (chartEditStore.getTargetChart.selectId.length > 1) {
      return allList.filter((i) => [MenuEnum.GROUP, MenuEnum.DELETE].includes(i.key as MenuEnum));
    }
    const statusMenuEnums: MenuEnum[] = [];
    if (targetInstance.status.lock) {
      statusMenuEnums.push(MenuEnum.LOCK);
    } else {
      statusMenuEnums.push(MenuEnum.UNLOCK);
    }
    if (targetInstance.status.hide) {
      statusMenuEnums.push(MenuEnum.HIDE);
    } else {
      statusMenuEnums.push(MenuEnum.SHOW);
    }
    return targetList.filter((i) => !statusMenuEnums.includes(i.key as MenuEnum));
  };

  // 主题色
  const themeSetting = computed(() => {
    const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting;
    return chartThemeSetting;
  });

  // 配置项
  const themeColor = computed(() => {
    const colorCustomMergeData = colorCustomMerge(
      chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo
    );
    return colorCustomMergeData[chartEditStore.getEditCanvasConfig.chartThemeColor];
  });

  // 是否展示渲染
  const filterShow = computed(() => {
    return chartEditStore.getEditCanvasConfig.filterShow;
  });

  // 背景
  const rangeStyle = computed(() => {
    // 设置背景色和图片背景
    const background = chartEditStore.getEditCanvasConfig.background;
    const backgroundImage = chartEditStore.getEditCanvasConfig.backgroundImage;
    const selectColor = chartEditStore.getEditCanvasConfig.selectColor;
    const backgroundColor = background || undefined;

    const computedBackground = selectColor
      ? { background: backgroundColor }
      : { background: `url(${backgroundImage}) no-repeat center center / cover !important` };

    return {
      ...computedBackground,
      width: 'inherit',
      height: 'inherit',
    };
  });

  onMounted(() => {
    // 键盘事件
    useAddKeyboard();
    // 获取数据
    dataSyncFetch();
    // 定时更新数据
    // intervalDataSyncUpdate()
  });
</script>

<style lang="scss" scoped>
  @include goId('chart-edit-layout') {
    position: relative;
    width: 100%;
    overflow: hidden;
    @extend .go-point-bg;
    @include background-image('background-point');

    @include goId('chart-edit-content') {
      border-radius: 10px;
      overflow: hidden;
      @extend .go-transition;
      @include fetch-theme('box-shadow');

      .edit-content-chart {
        position: absolute;
        overflow: hidden;
      }
    }
  }
</style>
