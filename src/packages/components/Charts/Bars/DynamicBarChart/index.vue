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
  import { ref, computed, PropType } from 'vue';
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
  import {
    getNewDataByLimit,
    setDynamicData,
  } from '@/packages/components/Charts/Bars/DynamicBarChart/util';

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

  const option = computed(() => {
    return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
  });
  const limitCount = computed(() => props.chartConfig?.option.dataConfigSet.lengthLimit);
  const optionsC = computed(() => vChartRef.value?.option);
  const xAxisOneData = computed(() => optionsC.value?.xAxis[0]?.data);
  const xAxisTwoData = computed(() => optionsC.value?.xAxis[1]?.data);
  const seriesOneData = computed(() => optionsC.value?.series[0]?.data);
  const seriesTwoData = computed(() => optionsC.value?.series[1]?.data);
  const rd = ref(false);
  const loadData = (data: any) => {
    if (data?.xAxis?.length === 2 && data?.series?.length === 2) {
      setDynamicData(
        vChartRef,
        getNewDataByLimit(xAxisOneData.value, () => data.xAxis[0], limitCount.value),
        getNewDataByLimit(xAxisTwoData.value, () => data.xAxis[1], limitCount.value),
        getNewDataByLimit(seriesOneData.value, () => data.series[0], limitCount.value),
        getNewDataByLimit(seriesTwoData.value, () => data.series[1], limitCount.value)
      );
    }
  };
  const { vChartRef, isRequest } = useChartDataFetch(
    props.chartConfig,
    useChartEditStore,
    (data) => {
      rd.value = true;
      loadData(data);
    }
  );
  useDataSet(
    vChartRef,
    props,
    xAxisOneData,
    xAxisTwoData,
    seriesOneData,
    seriesTwoData,
    rd,
    limitCount
  );
</script>
