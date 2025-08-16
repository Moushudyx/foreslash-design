import DefaultTheme from "vitepress/theme";
import { defineCustomElements } from "foreslash-ui/loader";
// import "./custom.css";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    if (window) {
      defineCustomElements(window);
    }
  },
};
