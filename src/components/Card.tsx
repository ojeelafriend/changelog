import { tag } from '@/utils/interpreter';
import styles from './card.module.css';

export function Card({ id, title, author, creation, image }: tag) {
  return (
    <article key={id} className={styles.container}>
      <div className={styles.containImage}>
        <img className={styles.frontPage} src={image} alt="" />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </article>
  );
}
