import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ListTile from '../src/components/list-tile';
import styles from '../styles/Home.module.css';

import { Flex } from '@mantine/core';
import LineUp from '../src/components/LineUp';

const Home: NextPage = () => {
  const title = 'タイトル';
  const kana = 'カナ';
  const thumbnail =
    'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';
  const range = new Array(10).fill(0);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
          wrap="wrap"
        >
          {range.map((_) => (
            <ListTile title={title} kana={kana} thumbnail={thumbnail}></ListTile>
          ))}
        </Flex>
        <h1>太田作</h1>
        <LineUp></LineUp>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
