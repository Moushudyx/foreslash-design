<template>
  <div ref="container" class="editor-container">
    <Monaco
      ref="monaco"
      :filename="filename"
      :language="language"
      :theme="theme"
      :value="code"
      :readOnly="readonly"
      @change="(value) => emit('change', value)"
    />
  </div>
</template>
<script lang="ts" setup>
import Monaco from "@vue/repl/monaco-editor";

const props = withDefaults(
  defineProps<{
    filename: string;
    code: string;
    readonly: boolean;
    language: string;
    theme: "dark" | "light";
  }>(),
  {
    filename: "default.tsx",
    code: "",
    readonly: false,
    language: "javascript",
    theme: "dark",
  }
);
const emit = defineEmits<{
  (e: "change", value: string): void;
}>();
</script>
