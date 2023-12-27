<template>
  <collapse-item name="图表设置" :expanded="true">
    <setting-item-box name="配置" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.echartsOpts" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="数据" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { option } from './config';
  import { CollapseItem, SettingItem, SettingItemBox } from '@/components/Pages/ChartItemSetting';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
</script>
