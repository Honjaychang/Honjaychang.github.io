const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'HonjayChang',
  tagline: 'Recording',
  url: 'https://honjaychang.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/photo.ico',
  organizationName: 'Honjaychang',
  projectName: 'Honjaychang.github.io',
  themeConfig: {
    hideableSidebar: true,
    // titleDelimiter: '🦖', // 默认为 `|`
    navbar: {
      // title: 'Honjay',
      logo: {
        alt: 'My Site Logo',
        src: 'img/photo.jpg',
        href: 'https://honjaychang.github.io/docs/home',
      },
      items: [
        {
          type: 'doc',
          docId: 'Home',
          position: 'left',
          label: 'Docs',
        },
        // {
        //   to: 'docs/Home',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/Honjaychang',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   logo: {
    //     alt: 'Logo',
    //     src: 'img/photo.jpg',
    //     href: 'https://github.com/Honjaychang',
    //   },
    //   copyright: `Copyright © ${new Date().getFullYear()} Honjaychang`,
    // },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
