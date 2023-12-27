<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr,
    }"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, useAttrs, watch } from 'vue';
  import config from './config';
  import { isPreview, JSONParse } from '@/utils';
  import VChart from 'vue-echarts';
  import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook';
  import { mergeTheme } from '@/packages/public';
  import { includes } from './config';
  import { useChartDataFetch } from '@/hooks';
  import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
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
  const optionSet = JSONParse(props.chartConfig.option.echartsOpts);
  const initOptions = useCanvasInitOptions(optionSet, props.themeSetting);
  const option = computed(() => {
    return mergeTheme(optionSet, props.themeSetting, includes);
  });
  //Options for updating chart option.
  //更新时需要替换的属性
  const replaceMergeArr = ref<string[]>();
  //获取图表数据
  const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>

<style lang="scss" scoped></style>
