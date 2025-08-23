<template>
  <div
    :class="['tsx-playground', isFullPage ? 'tsx-playground-full-page' : '']"
  >
    <div class="tsx-playground__editor">
      <Editor
        :code="currentCode"
        :readonly="readonly"
        :theme="theme"
        :language="language"
        @change="handleCodeUpdate"
      />
    </div>
    <div class="tsx-playground__preview">
      <Previewer :code="currentCode" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Editor from "../Editor/index.vue";
import Previewer from "../Previewer/index.vue";

// 接收初始代码作为 prop
const props = withDefaults(
  defineProps<{
    code: string;
    readonly: boolean;
    language: string;
    isFullPage: boolean;
  }>(),
  {
    code: "",
    readonly: false,
    language: "tsx",
    isFullPage: false,
  }
);

const currentCode = ref(props.code);
const theme = ref<"dark" | "light">("light");
const handleCodeUpdate = (newCode: string) => {
  currentCode.value = newCode;
};
onMounted(() => {
  // 监听主题变化
  theme.value = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "class") {
        const isDark = document.documentElement.classList.contains("dark");
        theme.value = isDark ? "dark" : "light";
        return;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
  });
});
</script>
<style lang="scss">
.tsx-playground {
  display: flex;
  box-sizing: border-box;
  .tsx-playground__editor {
    box-sizing: border-box;
  }
  .tsx-playground__preview {
    box-sizing: border-box;
  }
  // 全屏
  &.tsx-playground-full-page {
    flex-direction: row;
    width: 100%;
    // 顶部导航栏 64 主体部分顶部 48 页脚 110
    height: calc(100vh - 64px - 48px - 110px);
    .tsx-playground__editor {
      flex: 1;
      width: 50%;
      height: 100%;
    }
    .tsx-playground__preview {
      flex: 1;
      width: 50%;
      height: 100%;
      padding: 16px 8px;
      color: #010101;
      background-color: #fefefe;
    }
  }
  // 一般模式
  &:not(.tsx-playground-full-page) {
    flex-direction: column-reverse;
    padding: 8px 8px;
    margin: 16px 0;
    border: #9992 solid 1px;
    border-radius: 4px;
    transition: all 240ms ease;
    &:hover {
      border: #9999 solid 1px;
    }
    .tsx-playground__editor {
      // flex: 1;
      height: 25vh;
      min-height: 256px;
    }
    .tsx-playground__preview {
      // flex: 1;
      height: 25vh;
      min-height: 256px;
      padding: 4px 8px;
    }
  }
}
</style>
