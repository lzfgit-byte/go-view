<template>
  <div :style="{ backgroundColor: chartConfig?.option?.color }"> 天气 </div>
</template>

<script setup lang="ts">
  import { PropType, useAttrs, watch } from 'vue';
  import { CreateComponentType } from '@/packages/index.d';
  const props = defineProps({
    chartConfig: {
      type: Object as PropType<CreateComponentType>,
      required: true,
    },
  });
  watch(
    () => props.chartConfig?.option?.color,
    () => {
      console.log(props);
    }
  );
</script>

<style lang="scss" scoped></style>
