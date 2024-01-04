<template>
  <n-input v-model:value="inputModelValue" size="small" @click="showModal = true"></n-input>
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
        :language="'javascript'"
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
  import { ref } from 'vue-demi';
  import { icon } from '@/plugins';
  import { MonacoEditor } from '@/components/Pages/MonacoEditor';
  import { watchEffect } from 'vue';
  const props = defineProps({ value: Function });
  const emits = defineEmits(['update:value']);
  const { CloseIcon } = icon.ionicons5;
  const valueModel = useVModel(props, 'value', emits);

  const inputModelValue = ref<string>(valueModel.value?.toString() || '');
  //弹窗
  const showModal = ref(false);
  const dialogValue = ref(inputModelValue.value);
  watchEffect(() => {
    inputModelValue.value = valueModel.value?.toString() as string;
    if (inputModelValue.value.length > 0) {
      dialogValue.value = inputModelValue.value;
    }
  });
  const handlerConfirm = () => {
    const funStr = dialogValue.value.substring(
      dialogValue.value.indexOf('{') + 1,
      dialogValue.value.lastIndexOf('}')
    );
    const newFunc = new Function('param', `${funStr}`);
    valueModel.value = newFunc;
    showModal.value = false;
  };
</script>

<style scoped lang="scss"></style>
