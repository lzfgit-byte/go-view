<template>
  <div class="multi-container">
    <img :src="url" :style="style" />
  </div>
</template>

<script setup lang="ts">
  import { PropType, toRef } from 'vue';
  import { CreateComponentType } from '@/packages/index.d';
  const props = defineProps({
    chartConfig: {
      type: Object as PropType<CreateComponentType>,
      required: true,
    },
  });
  const url = toRef(props?.chartConfig?.option, 'url');
  const style = toRef(props?.chartConfig?.option, 'style');
</script>

<style lang="scss" scoped>
  .multi-container {
    img {
      width: 100%;
    }
  }
</style>
