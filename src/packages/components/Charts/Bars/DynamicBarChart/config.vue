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
  <collapse-item name="轴设置" v-if="series">
    <setting-item-box name="y轴label设置">
      <setting-item name="左侧">
        <n-input v-model:value="yAxis[0].name"></n-input>
      </setting-item>
      <setting-item name="右侧">
        <n-input v-model:value="yAxis[1].name"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="x轴显隐设置">
      <setting-item name="下">
        <div style="width: 100%; display: flex; justify-content: start">
          <n-switch v-model:value="xAxis[0].show"></n-switch>
        </div>
      </setting-item>
      <setting-item name="上">
        <div style="width: 100%; display: flex; justify-content: start">
          <n-switch v-model:value="xAxis[1].show"></n-switch>
        </div>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="数据设置" v-if="dataConfigSet">
    <setting-item-box name="静态数据">
      <setting-item>
        <n-switch v-model:value="dataConfigSet.dynamicStaticLoad"></n-switch>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="数据条数限制" :alone="true">
      <setting-item>
        <n-input-number v-model:value="dataConfigSet.lengthLimit"></n-input-number>
      </setting-item>
    </setting-item-box>
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
  const xAxis = computed(() => {
    return props.optionData.xAxis;
  });
  const dataConfigSet = computed(() => {
    return props.optionData?.dataConfigSet;
  });
</script>
