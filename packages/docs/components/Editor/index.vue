<template>
  <div class="editor-container vp-monaco-editor-container">
    <div
      ref="container"
      class="editor vp-monaco-editor"
      @keydown.ctrl.s.prevent="emitChangeEvent"
      @keydown.meta.s.prevent="emitChangeEvent"
    ></div>
    <div class="slot-container" style="display: none" ref="slotContainer">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, VNode, watch } from 'vue';
// import * as monaco from "monaco-editor-core";
import type { editor as monacoEditorType } from 'monaco-editor-core';
import { noop } from 'foreslash';

const props = withDefaults(
  defineProps<{
    code?: string;
    readonly?: boolean;
    language?: string;
    theme?: 'dark' | 'light';
  }>(),
  {
    code: '',
    readonly: false,
    language: 'javascript',
    theme: 'dark',
  }
);

const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();

const slots = defineSlots<{
  default: () => VNode[];
}>();
const container = ref<HTMLElement>();
const slotContainer = ref<HTMLElement>();
const editor = shallowRef<monacoEditorType.IStandaloneCodeEditor>();

const inputCode = computed(() => {
  return props.code || getSlotContainerTextContent();
});

onMounted(async () => {
  console.log('slots', slots);
  registerEditor();
  // 监听 props 变化
  watch(
    () => inputCode.value,
    (newCode) => {
      if (editor.value) {
        if (editor.value.getValue() !== newCode) {
          editor.value.setValue(newCode);
        }
      }
    }
  );
  // watch(
  //   () => props.language,
  //   (newLanguage) => {
  //     if (editor.value) {
  //       editor.value.updateOptions({
  //         language: newLanguage,
  //       });
  //     }
  //   }
  // );
  watch(
    () => props.readonly,
    (newReadonly) => {
      if (editor.value) {
        editor.value.updateOptions({
          readOnly: newReadonly,
        });
      }
    }
  );
  const { registerTheme } = await import('./editorUtils');
  const theme = registerTheme();
  watch(
    () => props.theme,
    (newTheme) => {
      if (editor.value) {
        editor.value.updateOptions({
          theme: newTheme === 'light' ? theme.light : theme.dark,
        });
      }
    }
  );
});
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
async function registerEditor() {
  const { editor: monacoEditor, KeyCode, KeyMod } = await import('monaco-editor-core');
  const { registerTheme } = await import('./editorUtils');
  if (!container.value) {
    return;
  }
  if (editor.value) {
    editor.value.dispose();
  }
  const theme = registerTheme();
  console.log('Editor', {
    value: inputCode.value,
    language: props.language,
    readOnly: props.readonly,
    theme: props.theme === 'light' ? theme.light : theme.dark,
  });
  const editorInstance = monacoEditor.create(container.value, {
    value: inputCode.value,
    language: props.language,
    readOnly: props.readonly,
    theme: props.theme === 'light' ? theme.light : theme.dark,
    fontSize: 13,
    tabSize: 2,
    minimap: {
      enabled: false,
    },
  });
  editorInstance.onDidChangeModelContent(() => {
    emitChangeEvent();
  });
  editorInstance.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, noop); // 禁用保存
  editor.value = editorInstance;
}
function emitChangeEvent() {
  emit('change', editor.value?.getValue() || '');
}
function getSlotContainerTextContent() {
  if (!slotContainer.value) return '';
  const pre = slotContainer.value.querySelector('pre');
  if (!pre) return '';
  return (pre.textContent || '').trim();
}
</script>
<style lang="scss">
.vp-monaco-editor-container {
  height: 100%;
  .slot-container {
    display: none;
  }
}
.vp-monaco-editor {
  height: 100%;
}
</style>
