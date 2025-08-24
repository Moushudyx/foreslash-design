import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const en = defineConfig({
  lang: 'en',
  description: 'Foreslash is a Javascript utilities lib which contains plenty of practical functions',

  themeConfig: {
    nav: nav(),

    sidebar: { 'en/comp/': [...sidebarComp()] , 'en/func/': [...sidebarFunc()], 'en/design/': [...sidebarDesign()] },

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
      link: '/en/comp/',
      activeMatch: '/en/comp/',
    },
    {
      text: 'Utilities',
      link: '/en/func/',
      activeMatch: '/en/func/',
    },
    {
      text: 'Design',
      link: '/en/design/',
      activeMatch: '/en/design/',
    },
    {
      text: 'TSX Playground',
      link: '/playground/jsx',
      activeMatch: '/playground/jsx',
    },
    {
      text: 'Vue Playground(WIP)',

      link: '/playground/vue',
      activeMatch: '/playground/vue',
    },
    {
      text: 'Contributing',
      items: [
        {
          text: 'Issues',
          link: 'https://github.com/Moushudyx/foreslash-ui/issues',
        },
        {
          text: 'Pull Requests',
          link: 'https://github.com/Moushudyx/foreslash-ui/pulls',
        },
      ],
    },
  ]
}

function sidebarComp(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Quick Start',

      link: 'en/comp/index',
    },
    {
      text: 'Basic Components',
      base: 'en/comp/base/',
      collapsed: false,
      items: [
        { text: 'button Button', link: 'button' },
      ],
    },
  ]
}

function sidebarFunc(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Utilities',
      link: 'en/func/index',
    },
  ]
}

function sidebarDesign(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Design',
      link: 'en/design/index',
    },
  ]
}

export const enSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  en: {
    translations: {},
  },
}
