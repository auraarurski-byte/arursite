import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ArurHub V2</title>
        <meta name="description" content="ArurHub V2 – Premium Roblox Script Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.white}>ARUR</span>
          <span className={styles.purple}>HUB</span>
          <sup className={styles.v2}>V2</sup>
        </h1>
        <p className={styles.description}>
          The final evolution. Elite utility. Absolute dominance.
        </p>
      </main>
    </div>
  );
};

export default Home;
