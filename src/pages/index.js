import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';
import Head from '@docusaurus/Head';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './index.css';
import ModuleCard from './module/moduleCard';
import BrowserOnly from '@docusaurus/BrowserOnly';

const defaultModuleShowcase = [
  /*{
    title: <>Pathing</>,
    imageUrl: 'https://assets.gw2dat.com/1228248.png',
    description: (
      <>
        Robust TacO marker pack support to guide you through map completion, difficult story content, tedious achievements, and more.
      </>
    ),
    module: "bh.community.pathing"
  },
  {
    title: <>Achievement Tracker</>,
    imageUrl: 'https://assets.gw2dat.com/965720.png',
    description: (
      <>
        Track any achievement with multiple windows and information from the official wiki.
      </>
    ),
    module: "Denrage.AchievementTrackerModule"
  },
  {
    title: <>Racing Meter</>,
    imageUrl: 'https://assets.gw2dat.com/993691.png',
    description: (
      <>
        Specialized mount speedometers. Leaderboards for official and unofficial races. Race your ghost or ghosts from the leaderboards.
      </>
    ),
    module: "Ideka.RacingMeter"
  }*/
];

const features = [
  {
    title: <>Focus on Features</>,
    imageUrl: 'img/1769866.png',
    description: (
      <>
        We've got the boring overlay stuff like input handling, settings management, API access delegation, and more handled behind the scenes so you can focus on pushing features.
      </>
    ),
  },
  {
    title: <>Fit Right In</>,
    imageUrl: 'img/156015.png',
    description: (
      <>
        Avoid breaking the immersion.  We've replicated a number of Guild Wars 2's beautiful UI controls and elements within our custom UI framework so that you don't have to.
      </>
    ),
  },
  {
    title: <>Experience Powerful Tools</>,
    imageUrl: 'img/1769855.png',
    description: (
      <>
        Get started quickly with the module template for Visual Studio.  Enjoy first-class debugger support when testing modules in Blish HUD.  Use the Debug module for additional insight at runtime.
      </>
    ),
  },
  {
    title: <>Publish Your Module</>,
    imageUrl: 'img/1948124.png',
    description: (
      <>
        Release your modules through our central repository, making them available to anyone using Blish HUD.  Build and manage your modules automatically through our custom build host and services.
      </>
    ),
  },
  {
    title: <>Enjoy Comprehensive APIs</>,
    imageUrl: 'img/1228276.png',
    description: (
      <>
        With access to both the GW2 Web API and MumbleLink backed by the powerful <a href="https://github.com/Archomeda/Gw2Sharp" target="_blank">Gw2Sharp</a> .NET library, our own contextualized data, and a pipe of combat data straight from ArcDPS, you'll have everything you need.
      </>
    ),
  },
  {
    title: <>Collaborate on Discord</>,
    imageUrl: 'img/1769865.png',
    description: (
      <>
        Join our <a target="_blank" href="https://discord.gg/HzAV82d">Discord channel</a> (more than 13,000 users!), contribute to Blish HUD development, get help in developing your modules, and showcase your work to other Blish HUD users.
      </>
    ),
  },
];

function Module({ imageUrl, title, description, module }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <a href={`/modules/?module=${module}`} className={clsx('col col--3 module-card', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} style={{ borderRadius:"8px", marginBottom:"1rem" }} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </a>
  );
}

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / 86400000); // ms/day
  }

  function shuffleDeterministic(array, seed) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280; // simple LCG
      const j = Math.floor((seed / 233280) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [moduleShowcase, setModuleShowcase] = useState(defaultModuleShowcase);

  useEffect(() => {
    async function fetchRotation() {
      try {
        const response = await fetch('https://pkgs.blishhud.com/metadata/rotation.json');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          return;
        }

        const seed = getDayOfYear(); // today's deterministic seed

        const randomized = shuffleDeterministic(data, seed)
          .slice(0, 4)
          .map((item) => ({
            title: item.name,
            imageUrl: `https://pkgs.blishhud.com/metadata/img/module/${item.module}.png`,
            description: item.description,
            module: item.module,
          }));

        setModuleShowcase(randomized);
      } catch (error) {
        // On error, keep using defaultModuleShowcase
        console.error('Failed to load module rotation:', error);
      }
    }

    fetchRotation();
  }, []);

  const items = [

    // TODO: Put module tiles here.
  ]

  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <Head>
        <meta name="keywords" content="Guild Wars 2, gw2, Blish, HUD, bhud, TacO, Overlay, addons, mods, plugins" />
        <meta name="og:image" content="/img/logo.png" />
      </Head>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg link--download',
                styles.getStarted,
              )}
              to='https://github.com/blish-hud/Blish-HUD/releases/download/v1.2.0/Blish.HUD.1.2.0.zip'>
              Download Latest
            </Link>&nbsp;
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/user/getting-started')}>
              Get Started
            </Link>&nbsp;
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('/docs/user/troubleshooting')}>
              Troubleshooting
            </Link>
          </div>
          <br />
          <iframe width="640" height="360" src="https://www.youtube.com/embed/iLYYumF2SCY" frameBorder="0" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
        </div>
      </header>
      {moduleShowcase && moduleShowcase.length > 0 && (
        <main>
          <section className={styles.features}>
            <div className="container">
              <BrowserOnly>{() => (
                <div className="row">
                  {moduleShowcase.map((props, idx) => (
                    <Module key={idx} {...props} />
                  ))}
                </div>
              )}
              </BrowserOnly>
            </div>
          </section>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg link--download',
                styles.getStarted,
              )}
              to='/modules/'>
              and 80+ more modules...
            </Link>
          </div>
          <div className="container" style={{ display: "none" }}>
            <div className="module-content">
              <div className="module-cards" style={{ display: "default", gridTemplateColumns: "default" }}>
                <AliceCarousel items={items} responsive={{ 0: { items: 2 } }} />
              </div>
            </div>
          </div>
          <img src="/img/events-hero-half.png" className="ui-hero" />
        </main>
      )}
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <p className="hero__subtitle">For Developers</p>
          <h1 className="hero__title">{siteConfig.title} Module API</h1>
          <p className="hero__subtitle">Compiled .NET modules to add your own features.</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/dev')}>
              Read the Docs
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
