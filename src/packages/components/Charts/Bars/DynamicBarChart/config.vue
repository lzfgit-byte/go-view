<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="图表设置" :expanded="true">
    <setting-item-box name="图表配置" :alone="true">
      <setting-item>
        <n-input></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
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
  console.log(props.optionData);
</script>
