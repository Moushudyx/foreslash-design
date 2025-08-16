import { defineConfig } from "vitepress";
import { zh, zhSearch } from './zh'
import { en, enSearch } from './en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Foreslash-UI",
  description: "A Fancy Web Component Lib",
  rewrites: {
    "zh/:rest*": ":rest*",
  },
  base: "/foreslash-ui/",
  cleanUrls: true,

  lastUpdated: true,
  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Moushudyx/foreslash-ui" },
    ],
  },
  locales: {
    root: { label: "中文", ...zh },
    en: { label: "English", ...en },
  },
});
