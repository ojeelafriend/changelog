export type news = {
  creation: string;
  title: string;
  body: string;
  image?: string;
  author: string;
};

export function Card({ title, body, author, creation }: news) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{creation}</p>
      <p>{body}</p>
    </div>
  );
}
