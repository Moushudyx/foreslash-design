<template>
  <div ref="container" class="editor-container">
    <ClientOnly>
      <Monaco
        ref="monaco"
        :filename="filename"
        :language="language"
        :theme="theme"
        :value="code"
        :readOnly="readonly"
        @change="(value) => emit('change', value)"
      />
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
// import Monaco from "@vue/repl/monaco-editor";
import { inBrowser } from "vitepress";
import { defineAsyncComponent } from "vue";

const Monaco = inBrowser
  ? defineAsyncComponent(() => import('@vue/repl/monaco-editor'))
  : () => null;
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
