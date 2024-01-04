<template>
  <global-setting :option-data="optionData" />
  <CollapseItem name="饼图配置" :expanded="true">
    <setting-item-box name="内外环" v-if="radius">
      <setting-item name="内">
        <n-input v-model:value="optionData.series[0].radius[0]"></n-input>
      </setting-item>
      <setting-item name="外">
        <n-input v-model:value="optionData.series[0].radius[1]"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="角度" v-if="startAngle" :alone="true">
      <setting-item>
        <n-input-number v-model:value="optionData.series[0].startAngle"></n-input-number>
      </setting-item>
    </setting-item-box>
  </CollapseItem>
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
  const radius = computed(() => props?.optionData?.series[0].radius);
  const startAngle = computed(() => props.optionData?.series[0].startAngle);
</script>
