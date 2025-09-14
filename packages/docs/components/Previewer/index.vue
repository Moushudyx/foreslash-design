<template>
  <div class="previewer">
    <div ref="previewerRoot" class="previewer-root"></div>
  </div>
</template>
<script lang="ts" setup>
// 传入一段 JSX/TSX 代码渲染出来
import {
  h,
  createApp,
  defineComponent,
  Fragment,
  ref,
  type App,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { transform } from "@babel/standalone";
import * as foreslash from "foreslash";
// import * as babelPluginJsx from "@vue/babel-plugin-jsx";

const props = withDefaults(
  defineProps<{
    code: string;
  }>(),
  {
    code: "",
  }
);

const previewerRoot = ref<HTMLDivElement>();

const app = ref<App>();

const _renderPreview = (code: string) => {
  if (!previewerRoot.value) {
    return;
  }

  try {
    // 清理之前的实例
    if (app.value) {
      app.value.unmount();
      app.value = undefined;
    }
  } catch (e) {
    console.error("Vue preview error:", e);
    return;
  }
  if (!code) {
    return;
  }
  try {
    // 模块执行环境
    const module = { exports: {} as any };
    const exports = module.exports;
    // 注入 Vue 的 h 函数和必要的 API
    const availableModules = {
      foreslash: foreslash,
      Vue: { h, createApp, defineComponent, Fragment },
    };
    const require = (id: string) => {
      if (availableModules[id]) {
        return availableModules[id];
      }
      throw new Error(
        `模块 "${id}" 未找到或不可用。可用模块: ${Object.keys(
          availableModules
        ).join(", ")}`
      );
    };
    const context = {
      // Vue: { h, createApp, defineComponent, Fragment },
      h,
      createApp,
      defineComponent,
      Fragment,
      require,
    };
    const propList = Object.entries(context);

    // 转换代码
    const transformedCode = transformCode(code);

    // 执行代码
    // console.log(transformedCode);
    const executeCode = new Function(
      "module",
      "exports",
      "Vue",
      ...propList.map(([key]) => key),
      transformedCode || ''
    );
    executeCode(
      module,
      exports,
      { h, createApp, defineComponent, Fragment },
      ...propList.map(([_, value]) => value)
    );

    // 获取组件
    const Component = module.exports.default || module.exports;

    if (!Component) {
      throw new Error("代码必须导出默认组件或直接是组件");
    }

    // 创建并挂载应用
    app.value = createApp(Component);
    app.value.mount(previewerRoot.value);
  } catch (e) {
    console.error("Vue preview error:", e);
  }

  function transformCode(code: string) {
    return transform(code, {
      presets: [
        [
          "react",
          {
            pragma: "h", // default pragma is React.createElement (only in classic runtime)
            pragmaFrag: "Fragment", // default is React.Fragment (only in classic runtime)
            throwIfNamespace: false, // defaults to true
            runtime: "classic", // defaults to classic
            // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
          },
        ],
        "typescript",
      ],
      plugins: ["transform-modules-commonjs"],
      filename: "user-code.jsx",
    }).code;
  }
};
// 延迟 500ms 执行，如果此期间再次调用，取消之前的调用
let timer: ReturnType<typeof setTimeout> | undefined;
const renderPreview = (code: string, delay = true) => {
  if (timer) {
    clearTimeout(timer);
  }
  if (!delay) {
    _renderPreview(code);
    return;
  }
  timer = setTimeout(() => {
    _renderPreview(code);
  }, 500);

  return () => {
    clearTimeout(timer);
  };
};

onMounted(() => {
  renderPreview(props.code, false);
  watch(
    () => props.code,
    (newCode) => {
      renderPreview(newCode);
    }
  );
});

onBeforeUnmount(() => {
  if (app.value) {
    app.value.unmount();
    app.value = undefined;
  }
});
</script>
