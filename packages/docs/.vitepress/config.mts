import { defineConfig } from 'vitepress';
import markdownItContainer from 'markdown-it-container';
import { zh, zhSearch } from './zh';
import { en, enSearch } from './en';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Foreslash-UI',
  description: 'A Fancy Web Component Lib',
  rewrites: {
    'zh/:rest*': ':rest*',
  },
  base: '/foreslash-design/',
  cleanUrls: true,

  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Moushudyx/foreslash-ui' }],
  },
  locales: {
    root: { label: '中文', ...zh },
    en: { label: 'English', ...en },
  },
  markdown: {
    config: (md) => {
      // 自定义容器
      md.use(markdownItContainer, 'coder', {
        validate(params: string) {
          return params.trim().match(/^coder(.*)$/);
        },
        render(tokens: { [x: string]: { nesting: number } }, idx: string | number) {
          if (tokens[idx].nesting === 1) {
            // 开始标签
            return `<Coder>\n`;
          } else {
            // 结束标签
            return `</Coder>\n`;
          }
        },
      });
    },
  },
  vite: {
    ssr: {
      noExternal: ['monaco-editor-core', '@vue/repl'],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.includes('fs-'),
      },
    },
  },
});
