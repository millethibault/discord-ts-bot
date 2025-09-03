import type {JSX, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

/*export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}*/

import React from 'react';

export default function Home(): JSX.Element {
  return (
    <Layout title="Accueil" description="Documentation du bot Discord">
      <main style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Bienvenue sur la documentation du bot</h1>
        <div style={{ marginTop: '2rem' }}>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1411775850864443402&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fcallback&scope=identify"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#5865F2',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            🔗 Se connecter avec Discord
          </a>
        </div>
      </main>
    </Layout>
  );
}