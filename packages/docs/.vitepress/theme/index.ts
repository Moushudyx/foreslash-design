import DefaultTheme from "vitepress/theme";
import { defineCustomElements } from "foreslash-ui/loader";
import Demo from "../../components/Demo/index.vue";
import VuePlayground from "../../components/Playground/vue.vue";
import Previewer from "../../components/Previewer/index.vue";
import Coder from "../../components/Playground/index.vue";
import "./custom.scss";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    if (window) {
      defineCustomElements(window);
      app.component("Demo", Demo);
      app.component("VuePlayground", VuePlayground);
      app.component("Previewer", Previewer);
      app.component("Coder", Coder);
      app.component("TsxPlayground", Coder);
    }
  },
};
