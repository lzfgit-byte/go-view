<template>
  <global-setting :option-data="optionData" />
  <CollapseItem name="饼图配置">
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
    <setting-item-box name="位置" v-if="optionData.series[0].center[0]">
      <setting-item name="左">
        <n-input v-model:value="optionData.series[0].center[0]"></n-input>
      </setting-item>
      <setting-item name="右">
        <n-input v-model:value="optionData.series[0].center[1]"></n-input>
      </setting-item>
    </setting-item-box>
  </CollapseItem>
  <collapse-item name="标签">
    <template #header>
      <n-switch v-model:value="optionData.series[0].label.show"></n-switch>
    </template>
    <setting-item-box name="格式化" :alone="true">
      <setting-item>
        <FuncInput
          :language="'javascript'"
          v-model:value="optionData.series[0].label.formatter"
        ></FuncInput>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="大小">
        <n-input-number v-model:value="optionData.series[0].label.fontSize"></n-input-number>
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
  import FuncInput from '@/packages/components/Charts/Pies/PieHalfDonut/FuncInput.vue';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
  const radius = computed(() => props?.optionData?.series[0].radius);
  const startAngle = computed(() => props.optionData?.series[0].startAngle);
</script>
