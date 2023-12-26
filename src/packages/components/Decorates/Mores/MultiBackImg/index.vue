<template>
  <div> 新组件 </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { CreateComponentType } from '@/packages/index.d';
  const props = defineProps({
    chartConfig: {
      type: Object as PropType<CreateComponentType>,
      required: true,
    },
  });
</script>

<style lang="scss" scoped></style>
