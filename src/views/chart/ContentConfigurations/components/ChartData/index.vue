<template>
  <div v-if="targetData" class="go-chart-configurations-data">
    <SettingItemBox name="请求方式" :alone="true">
      <n-select
        v-model:value="targetData.request.requestDataType"
        :disabled="isNotData"
        :options="selectOptions"
      />
    </SettingItemBox>
    <!-- 静态 -->
    <ChartDataStatic
      v-if="targetData.request.requestDataType === RequestDataTypeEnum.STATIC"
    ></ChartDataStatic>
    <!-- 动态 -->
    <ChartDataAjax
      v-if="targetData.request.requestDataType === RequestDataTypeEnum.AJAX"
    ></ChartDataAjax>
    <!-- 数据池 -->
    <ChartDataPond
      v-if="targetData.request.requestDataType === RequestDataTypeEnum.Pond"
    ></ChartDataPond>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTargetData } from '../hooks/useTargetData.hook';
  import type { SelectCreateDataType } from './index.d';
  import { SelectCreateDataEnum } from './index.d';
  import { loadAsyncComponent } from '@/utils';
  import { SettingItemBox } from '@/components/Pages/ChartItemSetting';
  import { RequestDataTypeEnum } from '@/enums/httpEnum';
  import { ChartFrameEnum } from '@/packages/index.d';

  const ChartDataStatic = loadAsyncComponent(
    () => import('./components/ChartDataStatic/index.vue')
  );
  const ChartDataAjax = loadAsyncComponent(() => import('./components/ChartDataAjax/index.vue'));
  const ChartDataPond = loadAsyncComponent(() => import('./components/ChartDataPond/index.vue'));

  const { targetData } = useTargetData();

  // 选项
  const selectOptions: SelectCreateDataType[] = [
    {
      label: SelectCreateDataEnum.STATIC,
      value: RequestDataTypeEnum.STATIC,
    },
    {
      label: SelectCreateDataEnum.AJAX,
      value: RequestDataTypeEnum.AJAX,
    },
    {
      label: SelectCreateDataEnum.Pond,
      value: RequestDataTypeEnum.Pond,
    },
  ];

  // 无数据源
  const isNotData = computed(() => {
    return (
      targetData.value.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
      typeof targetData.value?.option?.dataset === 'undefined'
    );
  });
</script>
