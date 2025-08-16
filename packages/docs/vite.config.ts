// import vue from '@vitejs/plugin-vue'
/** @type {import('vite').UserConfig} */
export default {
  // plugins: [
  //   vue({
  //     template: {
  //       compilerOptions: {
  //         // 将所有带短横线的标签名都视为自定义元素
  //         isCustomElement: (tag) => tag.includes("fs-"),
  //       },
  //     },
  //   }),
  // ],
  optimizeDeps: {
    exclude: ["@vue/repl"],
  },
};
