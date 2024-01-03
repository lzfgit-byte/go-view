<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="图例内容设置" v-if="series">
    <setting-item-box name="柱图例" :alone="true">
      <setting-item>
        <n-input v-model:value="series[0].name"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="线图例" :alone="true">
      <setting-item>
        <n-input v-model:value="series[1].name"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="y轴label设置" v-if="series">
    <setting-item-box name="设置">
      <setting-item name="左侧">
        <n-input v-model:value="yAxis[0].name"></n-input>
      </setting-item>
      <setting-item name="右侧">
        <n-input v-model:value="yAxis[1].name"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="是否加载示例动态数据">
    <template #header>
      <n-switch v-model:value="loadDynamicData.value"></n-switch>
    </template>
  </collapse-item>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { option } from './config';
  import {
    CollapseItem,
    GlobalSetting,
    SettingItem,
    SettingItemBox,
  } from '@/components/Pages/ChartItemSetting';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
  const series = computed(() => {
    return props.optionData.series;
  });
  const yAxis = computed(() => {
    return props.optionData.yAxis;
  });
  const loadDynamicData = computed(() => {
    return props.optionData.loadDynamicData;
  });
</script>
