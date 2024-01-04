<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="饼图配置" :expanded="true">
    <SettingItemBox name="类型">
      <SettingItem>
        <n-select v-model:value="optionData.type" size="small" :options="fontWeightOptions" />
      </SettingItem>
      <SettingItem name="是否半环" v-if="false">
        <SettingItemCover>
          <n-switch v-model:value="optionData.isHalf" size="small" />
        </SettingItemCover>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="动画" :alone="true">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.isCarousel" size="small"></n-switch>
          <n-text>开启<n-text :depth="3">（将自动隐藏图例）</n-text></n-text>
        </n-space>
      </SettingItem>
      <SettingItem>
        <n-text :depth="3">无鼠标点击图例场景时，可强行打开图例</n-text>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="标签">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.series[0].label.show" size="small"></n-switch>
          <n-text>展示标签</n-text>
        </n-space>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.series[0].labelLine.show" size="small"></n-switch>
          <n-text>引导线</n-text>
        </n-space>
      </setting-item>
      <SettingItem name="位置">
        <n-select
          v-model:value="optionData.series[0].label.position"
          size="small"
          :options="labelConfig.position"
        />
      </SettingItem>
      <setting-item name="展示类型">
        <n-select
          v-model:value="optionData.series[0].label.formatter"
          size="small"
          :options="labelFormatterOptions"
        />
      </setting-item>
    </SettingItemBox>
    <setting-item-box name="圆角">
      <setting-item>
        <n-space>
          <n-input-number
            v-model:value="optionData.series[0].itemStyle.borderRadius"
            size="small"
            :min="0"
          ></n-input-number>
          <n-text>圆角大小</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-input-number
            v-model:value="optionData.series[0].itemStyle.borderWidth"
            size="small"
            :min="0"
          ></n-input-number>
          <n-text>线条宽度</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="内外环" v-if="radius">
      <setting-item name="内">
        <n-input v-model:value="optionData.series[0].radius[0]"></n-input>
      </setting-item>
      <setting-item name="外">
        <n-input v-model:value="optionData.series[0].radius[1]"></n-input>
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
  import { computed, PropType, watch } from 'vue';
  import {
    GlobalSetting,
    CollapseItem,
    SettingItemBox,
    SettingItem,
  } from '@/components/Pages/ChartItemSetting';
  import { PieTypeObject, PieTypeEnum } from './config';
  import { labelConfig } from '@/packages/chartConfiguration/echarts';
  import { option } from './config';
  import SettingItemCover from '@/components/Pages/ChartItemSetting/SettingItemCover.vue';
  const props = defineProps({
    optionData: {
      type: Object as PropType<typeof option>,
      required: true,
    },
  });
  const fontWeightOptions = [
    {
      label: PieTypeEnum.NORMAL,
      value: PieTypeObject[PieTypeEnum.NORMAL],
    },
    {
      label: PieTypeEnum.RING,
      value: PieTypeObject[PieTypeEnum.RING],
    },
    {
      label: PieTypeEnum.ROSE,
      value: PieTypeObject[PieTypeEnum.ROSE],
    },
  ];

  const labelFormatterOptions = [
    { label: '数据名', value: '{b}' },
    { label: '百分比', value: '{d}' },
    { label: '列名:百分比', value: '{b}:{d}%' },
  ];
  const radius = computed(() => props?.optionData?.series[0].radius);
</script>
