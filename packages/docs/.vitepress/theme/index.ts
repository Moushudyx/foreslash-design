import DefaultTheme from 'vitepress/theme';
import { defineCustomElements } from 'foreslash-ui/loader';
// import Demo from "../../components/Demo/index.vue";
import VuePlayground from '../../components/Playground/vue.vue';
import Previewer from '../../components/Previewer/index.vue';
import Coder from '../../components/Playground/index.vue';
import Layout from '../../components/Layout/index.vue';
import ColorPanel from '../../components/Color/panel.vue';

import './custom.scss';
import { h } from 'vue';

export default {
  ...DefaultTheme,
  Layout() {
    return h(Layout);
    // return h(Layout, null, {
    //   // 未来可能会添加其他插槽组件
    // });
  },
  async enhanceApp({ app }) {
    if (window) {
      defineCustomElements(window);
      // app.component("Demo", Demo);
      app.component('Previewer', Previewer);
      app.component('VuePlayground', VuePlayground);
      app.component('Coder', Coder);
      app.component('TsxPlayground', Coder);
      app.component('ColorPanel', ColorPanel);
    }
  },
};
