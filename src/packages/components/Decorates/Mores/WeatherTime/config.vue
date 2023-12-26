<template>
  {{ optionData.color }}
  <n-color-picker v-model:value="optionData.color" />
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { option } from './config';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
</script>
