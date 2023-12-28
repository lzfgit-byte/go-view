<template>
  <n-input
    v-model:value="inModelValue"
    type="textarea"
    size="small"
    @click="showModal = true"
  ></n-input>
  <n-modal v-model:show="showModal" @maskClick="showModal = false">
    <n-card
      style="width: 70vw"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">编辑json</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="showModal = false">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="showModal = false">确定</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { watch } from 'vue';
  import { JSONStringify } from '@/utils';
  import { ref } from 'vue-demi';
  import { icon } from '@/plugins';
  const props = defineProps({ value: String });
  const emits = defineEmits(['update:value']);
  const valueModel = useVModel(props, 'value', emits);
  const inModelValue = ref(valueModel.value);
  watch(inModelValue, () => {
    let func;
    try {
      func = new Function(`return ${inModelValue.value}`);
    } catch (e) {
      return;
    }
    valueModel.value = JSONStringify(func());
  });
  const showModal = ref(false);
  const { CloseIcon } = icon.ionicons5;
</script>

<style scoped lang="scss"></style>
