<template>
  <div
    ref="container"
    class="editor vp-monaco-editor"
    @keydown.ctrl.s.prevent="emitChangeEvent"
    @keydown.meta.s.prevent="emitChangeEvent"
  ></div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue";
import * as monaco from "monaco-editor-core";
import type { editor as monacoEditorType } from "monaco-editor-core";
import { noop } from "foreslash";

const { editor: monacoEditor, KeyCode, KeyMod } = monaco;
const props = withDefaults(
  defineProps<{
    code: string;
    readonly: boolean;
    language: string;
    theme: "dark" | "light";
  }>(),
  {
    code: "",
    readonly: false,
    language: "javascript",
    theme: "dark",
  }
);
import { registerTheme } from "./editorUtils";

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const container = ref<HTMLElement>();
const editor = shallowRef<monacoEditorType.IStandaloneCodeEditor>();

onMounted(() => {
  registerEditor();
  // 监听 props 变化
  watch(
    () => props.code,
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
  const theme = registerTheme();
  watch(
    () => props.theme,
    (newTheme) => {
      if (editor.value) {
        editor.value.updateOptions({
          theme: newTheme === "light" ? theme.light : theme.dark,
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

function registerEditor() {
  if (!container.value) {
    return;
  }
  if (editor.value) {
    editor.value.dispose();
  }
  const theme = registerTheme();
  console.log("Editor", {
    value: props.code,
    language: props.language,
    readOnly: props.readonly,
    theme: props.theme === "light" ? theme.light : theme.dark,
  });
  const editorInstance = monacoEditor.create(container.value, {
    value: props.code,
    language: props.language,
    readOnly: props.readonly,
    theme: props.theme === "light" ? theme.light : theme.dark,
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
  emit("change", editor.value?.getValue() || "");
}
</script>
<style lang="scss">
.vp-monaco-editor {
  height: 100%;
}
</style>
