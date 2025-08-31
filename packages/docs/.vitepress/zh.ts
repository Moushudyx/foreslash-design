import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'Foreslash-UI 是一个基于 Stencil 框架的 Web 组件库',

  themeConfig: {
    nav: nav(),

    sidebar: { 'comp/': [...sidebarComp()], 'func/': [...sidebarFunc()], 'design/': [...sidebarDesign()] },


    editLink: {
      pattern: 'https://github.com/Moushudyx/foreslash-ui/edit/master/packages/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 Mulan PSL v2 许可发布',
      copyright: `© ${new Date().getFullYear()} Moushu`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '组件',
      link: '/comp/',
      activeMatch: '/comp/',
    },
    {
      text: '函数',
      link: '/func/',
      activeMatch: '/func/',
    },
    {
      text: '设计',
      link: '/design/',
      activeMatch: '/design/',
    },
    {
      text: 'TSX 演练场',
      link: '/playground/jsx',
      activeMatch: '/playground/jsx',
    },
    {
      text: 'Vue 演练场(施工中)',
      link: '/playground/vue',
      activeMatch: '/playground/vue',
    },
    {
      text: '参与贡献',
      items: [
        {
          text: '工单',
          link: 'https://github.com/Moushudyx/foreslash-ui/issues',
        },
        {
          text: '合并',
          link: 'https://github.com/Moushudyx/foreslash-ui/pulls',
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
    {
      text: '配置组件',
      base: 'comp/config/',
      collapsed: false,
      items: [
        { text: 'theme-provider 主题配置', link: 'theme-provider' },
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

function sidebarDesign(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '设计',
      link: 'design/index',
    },
  ]
}

export const zhSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  zh: {
    // placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '显示',
        resetButtonTitle: '重置',
        backButtonTitle: '返回',
        noResultsText: '无法找到相关结果',
        // searchBox: {
        //   resetButtonTitle: '清除查询条件',
        //   resetButtonAriaLabel: '清除查询条件',
        //   cancelButtonText: '取消',
        //   cancelButtonAriaLabel: '取消',
        // },
        // startScreen: {
        //   recentSearchesTitle: '搜索历史',
        //   noRecentSearchesText: '没有搜索历史',
        //   saveRecentSearchButtonTitle: '保存至搜索历史',
        //   removeRecentSearchButtonTitle: '从搜索历史中移除',
        //   favoriteSearchesTitle: '收藏',
        //   removeFavoriteSearchButtonTitle: '从收藏中移除',
        // },
        // errorScreen: {
        //   titleText: '无法获取结果',
        //   helpText: '你可能需要检查你的网络连接',
        // },
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '选择',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '上',
          navigateDownKeyAriaLabel: '下',
          closeText: '关闭',
          closeKeyAriaLabel: '关闭',
          // searchByText: '搜索提供者',
        },
        // noResultsScreen: {
        //   noResultsText: '无法找到相关结果',
        //   suggestedQueryText: '你可以尝试查询',
        //   reportMissingResultsText: '你认为该查询应该有结果？',
        //   reportMissingResultsLinkText: '点击反馈',
        // },
      },
    },
  },
}
// export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
//   zh: {
//     placeholder: '搜索文档',
//     translations: {
//       button: {
//         buttonText: '搜索文档',
//         buttonAriaLabel: '搜索文档'
//       },
//       modal: {
//         searchBox: {
//           resetButtonTitle: '清除查询条件',
//           resetButtonAriaLabel: '清除查询条件',
//           cancelButtonText: '取消',
//           cancelButtonAriaLabel: '取消'
//         },
//         startScreen: {
//           recentSearchesTitle: '搜索历史',
//           noRecentSearchesText: '没有搜索历史',
//           saveRecentSearchButtonTitle: '保存至搜索历史',
//           removeRecentSearchButtonTitle: '从搜索历史中移除',
//           favoriteSearchesTitle: '收藏',
//           removeFavoriteSearchButtonTitle: '从收藏中移除'
//         },
//         errorScreen: {
//           titleText: '无法获取结果',
//           helpText: '你可能需要检查你的网络连接'
//         },
//         footer: {
//           selectText: '选择',
//           navigateText: '切换',
//           closeText: '关闭',
//           searchByText: '搜索提供者'
//         },
//         noResultsScreen: {
//           noResultsText: '无法找到相关结果',
//           suggestedQueryText: '你可以尝试查询',
//           reportMissingResultsText: '你认为该查询应该有结果？',
//           reportMissingResultsLinkText: '点击反馈'
//         }
//       }
//     }
//   }
// }
