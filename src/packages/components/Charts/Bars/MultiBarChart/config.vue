<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="图表设置" :expanded="true">
    <setting-item-box name="图表配置" :alone="true">
      <setting-item>
        <JSONInput v-model:value="optionData.echartsOpts" type="textarea" size="small"></JSONInput>
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
  import JSONInput from '@/packages/components/Charts/Bars/MultiBarChart/JSONInput.vue';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
</script>
