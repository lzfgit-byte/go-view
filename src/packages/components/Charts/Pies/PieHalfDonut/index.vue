<template>
  <v-chart
    ref="vChartRef"
    autoresize
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
  ></v-chart>
</template>

<script setup lang="ts">
  import { computed, onMounted, PropType, ref } from 'vue';
  import VChart from 'vue-echarts';
  import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { mergeTheme } from '@/packages/public/chart';
  import config, { includes } from './config';
  import { isPreview } from '@/utils';
  import {
    DatasetComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import { useChartDataFetch } from '@/hooks';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
  import { option as COption } from './config';

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
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
  ]);
  const fromRemote = ref([]);
  const dataset = computed(() =>
    fromRemote.value.length > 0 ? fromRemote.value : props.chartConfig?.option?.dataset
  );
  const option = computed(() => {
    const theme: typeof COption = mergeTheme(
      props.chartConfig.option,
      props.themeSetting,
      includes
    );
    theme.series[0].data = [
      ...dataset.value,
      {
        value: dataset.value.reduce((a: any, v: any) => a + v.value, 0),
        itemStyle: {
          color: 'none',
          decal: {
            symbol: 'none',
          },
        },
        label: {
          show: false,
        },
      },
    ];
    return theme;
  });
  const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData) => {
    fromRemote.value = newData;
  });
</script>
