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
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <monaco-editor
        v-model:modelValue="dialogValue"
        language="json"
        height="60vh"
        :editorOptions="{
          lineNumbers: 'on',
          minimap: { enabled: true },
        }"
      />
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
          <n-button type="primary" @click="handlerConfirm">确定</n-button>
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
  import { MonacoEditor } from '@/components/Pages/MonacoEditor';
  const props = defineProps({ value: String });
  const emits = defineEmits(['update:value']);
  const valueModel = useVModel(props, 'value', emits);
  const inModelValue = ref(valueModel.value);
  const setValueModel = (data: string) => {
    let func;
    try {
      func = new Function(`return ${data}`);
    } catch (e) {
      return;
    }
    valueModel.value = JSONStringify(func());
  };
  watch(inModelValue, (value) => {
    setValueModel(value as string);
  });
  const showModal = ref(false);
  const dialogValue = ref(props.value);
  const { CloseIcon } = icon.ionicons5;
  const handlerConfirm = () => {
    setValueModel(dialogValue.value as string);
    showModal.value = false;
  };
</script>

<style scoped lang="scss"></style>
