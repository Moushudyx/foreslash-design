import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const en = defineConfig({
  lang: 'en',
  description: 'Foreslash is a Javascript utilities lib which contains plenty of practical functions',

  themeConfig: {
    nav: nav(),

    sidebar: { 'comp/': [...sidebarComp()] , 'func/': [...sidebarFunc()] },

    editLink: {
      pattern: 'https://github.com/Moushudyx/foreslash/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the Mulan PSL v2 License',
      copyright: `© ${new Date().getFullYear()} Moushu`,
    },

  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Components',
      link: '/comp/',
      activeMatch: '/comp/',
    },
    {
      text: 'Utilities',
      link: '/func/',
      activeMatch: '/func/',
    },
    {
      text: 'Foreslash',
      items: [
        {
          text: 'Issues',
          link: 'https://github.com/Moushudyx/foreslash/issues',
        },
        {
          text: 'Pull Requests',
          link: 'https://github.com/Moushudyx/foreslash/pulls',
        },
      ],
    },
  ]
}

function sidebarComp(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '快速开始',
      link: 'comp/index',
    },
    {
      text: '基本组件',
      base: 'comp/base/',
      collapsed: false,
      items: [
        { text: 'button 按钮', link: 'button' },
      ],
    },
  ]
}

function sidebarFunc(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '快速开始',
      link: 'func/index',
    },
  ]
}

export const enSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  en: {
    translations: {},
  },
}
