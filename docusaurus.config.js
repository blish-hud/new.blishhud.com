// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blish HUD',
  tagline: 'Guild Wars 2\'s largest and most powerful addon overlay.',
  url: 'https://blishhud.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Blish-HUD', // Usually your GitHub org/user name.
  projectName: 'Blish-HUD', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/components/**', '/module/**', '/markers/**'],
          filename: 'sitemap.xml',
        }
      }),
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Blish HUD',
        logo: {
          alt: 'Blish HUD',
          src: 'img/logo.png',
        },
        items: [
          {
            to: 'docs/user/',
            activeBasePath: 'docs/user',
            label: 'User Guide',
            position: 'left',
          },
          {
            to: 'modules/',
            activeBasePath: 'modules/',
            label: 'Modules',
            position: 'left'
          },
          {
            to: 'docs/dev/',
            activeBasePath: 'docs/dev',
            label: 'Module Development',
            position: 'right',
          },
          {
            href: 'https://discord.gg/FYKN3qh',
            label: 'Discord',
            position: 'right',
            class: 'navbar__item navbar__link navbar__splitleft',
          },
          {
            href: 'https://github.com/blish-hud/Blish-HUD',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Designed and built with all the love in Tyria by the Blish HUD team with help from many more!
                  <br />
                  <br />
                  <a target="_blank" href="https://github.com/blish-hud/blish-hud/graphs/contributors">
                    <img src="https://contrib.rocks/image?repo=blish-hud/blish-hud&max=12" />
                  </a>
                  <hr />
                  <div style="text-align:left;">
                  <p>This site is not affiliated with ArenaNet, Guild Wars 2, or any of their partners. All copyrights reserved to their respective owners.</p>
                  <p>©2010-${new Date().getFullYear()} ArenaNet, LLC. All rights reserved. Guild Wars, Guild Wars 2, Heart of Thorns,
                  Guild Wars 2: Path of Fire, ArenaNet, NCSOFT, the Interlocking NC Logo, and all associated
                  logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other
                  trademarks are the property of their respective owners.</p>
                  <p><a style="color:white;" href="/legal">Legal</a> | <a style="color:white;" href="/privacy-policy">Privacy Policy</a></p>
                  </div>`,
      },
      announcementBar: {
        id: 'discord', // Any value that will identify this message. (discord = default, api = api down)
        content:
          'Check out our <a target="_blank" href="https://discord.gg/FYKN3qh">Discord channel</a> for the latest news, prerelease builds, and troubleshooting assistance.',
        backgroundColor: '#8172DA', // Defaults to `#fff`.  We typically use: #8172DA for normal and #d94130 for warnings.
        textColor: 'white', // Defaults to `#000`.
        isCloseable: true, // Defaults to `true`.
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false
      },
      metadata: [
        {name: 'og:image', content: '/img/logo.png'},
        {name: 'og:type', content: 'website'},
        {name: 'twitter:card', content: 'summary'}
      ],
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
