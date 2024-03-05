import { GetStaticPaths, GetStaticProps } from 'next';

import styles from '../styles/tag.module.css';
import { read, tag } from '../utils/interpreter';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.GIT_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.GIT_TOKEN}`,
    },
  });
  const items = await response.json();

  const paths = items.map(({ id }: any) => ({ params: { tag: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(`${process.env.GIT_URL}/${params?.tag}`, {
    headers: {
      Authorization: `Bearer ${process.env.GIT_TOKEN}`,
    },
  });
  const item = await response.json();

  const tag = read('one', item);

  return {
    props: tag,
  };
};

function Tag({ title, author, creation, body, image }: tag) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.backgroundHeader}></div>
        <div className={styles.container}>
          <div className={styles.containImage}>
            <img src={image} />
          </div>
          <div className={styles.content}>
            <h3>{creation}</h3>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tag;
