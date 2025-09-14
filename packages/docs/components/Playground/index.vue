<template>
  <div :class="['tsx-playground', isFullPage ? 'tsx-playground-full-page' : '']">
    <ClientOnly>
      <template v-if="showEditor || !isFirstShow">
        <div v-show="showEditor" class="tsx-playground__editor">
          <Editor
            :code="currentCode"
            :readonly="readonly"
            :theme="theme"
            :language="language"
            @change="handleCodeUpdate"
          />
        </div>
      </template>
      <div v-if="!isFullPage" class="tsx-playground__handler">
        <fs-button size="small" type="flat" @click="handleCodeReset" title="重置代码"> {{ '重置' }} </fs-button>
        <fs-button size="small" type="flat" @click="handleToggleEditor" :title="showEditor ? '收起代码' : '展开代码'">
          {{ '<>' }}
        </fs-button>
      </div>
      <div class="tsx-playground__preview">
        <Previewer :code="currentCode" />
      </div>
      <div class="slot-container" style="display: none" ref="slotContainer">
        <slot></slot>
      </div>
      <!-- <pre>{{ inputCode }}</pre> -->
      <!-- <pre style="color: red">{{ currentCode }}</pre> -->
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import Editor from '../Editor/index.vue';
import Previewer from '../Previewer/index.vue';

// 接收初始代码作为 prop
const props = withDefaults(
  defineProps<{
    code?: string;
    readonly?: boolean;
    language?: string;
    isFullPage?: boolean;
  }>(),
  {
    code: '',
    readonly: false,
    language: 'tsx',
    isFullPage: false,
  }
);
const isFirstShow = ref(true); // 第一次展开前用 v-if 隐藏, 而后使用 v-show 显示
const showEditor = ref(props.isFullPage);
const slotContainer = ref<HTMLElement>();
const inputCode = computed(() => {
  return props.code || getSlotContainerTextContent();
});
const theme = ref<'dark' | 'light'>('light');
const currentCode = ref(inputCode.value);
const handleCodeUpdate = (newCode: string) => {
  currentCode.value = newCode;
};
const handleCodeReset = () => {
  currentCode.value = inputCode.value;
};
const handleToggleEditor = () => {
  showEditor.value = !showEditor.value;
  if (showEditor.value && isFirstShow.value) {
    isFirstShow.value = false;
  }
};

onMounted(() => {
  // 监听主题变化
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark');
        theme.value = isDark ? 'dark' : 'light';
        return;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
  });
  nextTick(() => {
    handleCodeReset();
  });
});
function getSlotContainerTextContent() {
  if (!slotContainer.value) return '';
  const pre = slotContainer.value.querySelector('pre');
  if (!pre) return '';
  return (pre.textContent || '').trim();
}
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
      height: 40vh;
      min-height: 256px;
    }
    .tsx-playground__handler {
      display: flex;
      justify-content: flex-end;
      padding: 8px 12px;
      .tsx-playground__handler-icon {
        padding: 4px 6px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        transition: background-color 240ms ease;
        background-color: #9991;
        &:hover {
          background-color: #9993;
        }
        &:active {
          transition: background-color 60ms ease;
          background-color: #9996;
        }
      }
    }
    .tsx-playground__preview {
      // flex: 1;
      height: 20vh;
      min-height: 256px;
      padding: 4px 8px;
    }
  }
  .slot-container {
    display: none;
  }
}
</style>
