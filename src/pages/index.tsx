import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Card } from '../components/Card';
import { read, tag } from '../utils/interpreter';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GIT_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GIT_TOKEN}`,
    },
  });

  const result = await response.json();

  const tags = read('all', result);

  return {
    props: {
      arrayNews: tags,
    },
  };
};

export default function Home({ arrayNews }: { arrayNews: tag[] }) {
  return (
    <>
      <Head>
        <title>Changelog</title>
        <meta name="description" content="Lista de versiones de una aplicación genérica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h4>TAG</h4>
          <h1>CHANGELOG</h1>
        </div>

        <div className={styles.collection}>
          {arrayNews.map(({ id, title, body, image, author, creation }) => {
            return (
              <Link key={id} className={styles.linkCard} href={`/${id}`}>
                <Card key={id} id={id} title={title} body={body} author={author} image={image} creation={creation} />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
