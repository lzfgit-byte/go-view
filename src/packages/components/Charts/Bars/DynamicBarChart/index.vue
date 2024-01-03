<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
  import { ref, computed, watch, PropType, nextTick, onUnmounted } from 'vue';
  import VChart from 'vue-echarts';
  import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  //引入柱状图 折线图
  import { BarChart, LineChart } from 'echarts/charts';
  import config, { includes } from './config';
  import { mergeTheme } from '@/packages/public/chart';
  import { useChartDataFetch } from '@/hooks';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
  import { isPreview } from '@/utils';
  import {
    DatasetComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import useDataSet from '@/packages/components/Charts/Bars/DynamicBarChart/useDataSet';

  const props = defineProps({
    themeSetting: {
      type: Object,
      required: true,
    },
    themeColor: {
      type: Object,
      required: true,
    },
    chartConfig: {
      type: Object as PropType<config>,
      required: true,
    },
  });

  const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting);

  use([
    DatasetComponent,
    CanvasRenderer,
    BarChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
  ]);

  const replaceMergeArr = ref<string[]>();

  const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
  });

  watch(
    () => props.chartConfig.option.dataset,
    (newData, oldData) => {},
    {
      deep: false,
    }
  );

  const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (data) => {
    console.log('数据获取-->', data);
  });
  const {} = useDataSet(vChartRef, props);
</script>
