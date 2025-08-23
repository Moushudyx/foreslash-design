import * as monaco from "monaco-editor-core";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine-javascript.mjs";
import { shikiToMonaco } from "@shikijs/monaco";

import langVue from 'shiki/langs/vue.mjs'
import langTsx from "shiki/langs/tsx.mjs";
import langJsx from "shiki/langs/jsx.mjs";
import themeDark from "shiki/themes/dark-plus.mjs";
import themeLight from "shiki/themes/light-plus.mjs";

const editorState = { themeRegistered: false };
/**
 * 调用 shiki 注册主题, 如果已经注册则只返回主题名称\
 * 兼容 `@vue/repl`
 */
export function registerTheme() {
  if (!editorState.themeRegistered) {
    const highlighter = createHighlighterCoreSync({
      themes: [themeDark, themeLight],
      langs: [langVue, langTsx, langJsx],
      engine: createJavaScriptRegexEngine(),
    });
    monaco.languages.register({ id: 'vue' })
    monaco.languages.register({ id: 'tsx' })
    monaco.languages.register({ id: 'jsx' })
    shikiToMonaco(highlighter, monaco);
    editorState.themeRegistered = true;
  }
  return {
    light: themeLight.name!,
    dark: themeDark.name!,
  };
}
