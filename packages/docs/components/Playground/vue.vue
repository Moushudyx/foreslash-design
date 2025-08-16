<template>
  <div class="vue-playground">
    <Repl :editor="Monaco" :theme="theme" :ssr="false" :store="store" :compilerOptions="compilerOptions"
      @keydown.ctrl.s.prevent @keydown.meta.s.prevent />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Repl, useVueImportMap, useStore, mergeImportMap, File } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import { defineCustomElements } from "foreslash-ui/loader";
// import '@vue/repl/style.css'
const theme = ref<'dark' | 'light'>('dark')
function toggleTheme(isDark: boolean) {
  theme.value = isDark ? 'dark' : 'light'
}
const compilerOptions = {
  isCustomElement: (tag: string) => tag.startsWith('fs-')
}
const { productionMode, vueVersion, importMap } = useVueImportMap({
  // runtimeDev: "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.5.18/dist/runtime-dom.esm-browser.js",
  // runtimeProd: "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.5.18/dist/runtime-dom.esm-browser.js",
  // serverRenderer: "https://cdn.jsdelivr.net/npm/@vue/server-renderer@3.5.18/dist/server-renderer.esm-browser.js",
})
const isDev = true // location.hostname === 'localhost'
const builtinImportMap = ref(mergeImportMap(importMap.value, {
  imports: {
    "foreslash": 'https://unpkg.com/foreslash/lib/index.mjs',
    // "foreslash-ui": `${isDev? '' : 'https://unpkg.com/foreslash-ui/dist/index.js'}`,
    // "foreslash-ui/loader": `${isDev? '' : 'https://unpkg.com/foreslash-ui/lib/loader/index.js'}`
  }
}))
const sfcOptions = ref({
  template: {
    compilerOptions
  }
})
const store = useStore({
  builtinImportMap,
  sfcOptions
})
store.addFile(new File('src/App.vue', `\<template\>
  \<h1\>{{ msg }}\</h1\>
  \<input v-model="msg" \/\>
  \<fs-button\>{{ msg }}\</fs-button\>
\<\/template\>
\<script setup lang="ts"\>
import { ref } from 'vue'
import { randomString } from 'foreslash'

const msg = ref(randomString(6))
\<\/script\>`))
// store.addFile(new File('main.js', `
// import { defineCustomElements } from 'foreslash-ui/loader'
// // 注册自定义元素
// if (typeof window !== 'undefined') {
//   defineCustomElements(window)
// }`))
onMounted(() => {
  const cls = document.documentElement.classList
  toggleTheme(cls.contains('dark'))
  defineCustomElements(window)
  // setInterval(() => {
  //   console.log(store.files)
  // }, 1000)
})
</script>
<style scoped lang="scss">
.vue-playground {
  width: 100%;
  // 顶部导航栏 64 主体部分顶部 48 页脚 110
  height: calc(100vh - 64px - 48px - 110px);
  min-height: 400px;
}
</style>
