import Image from 'next/image';
import marked from 'marked';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/MainHeader';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const url = `https://mixd-blog.herokuapp.com/api${path}`;

  const { data, error } = useSWR(url);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const article = data;
  const imagePath = `/images/uploads/${article.id}.jpeg`;

  return (
    <>
      <Header />
      <div className="read-article">
        <h2>{article.title.toUpperCase()}</h2>
        <div className="center">
          by &nbsp;
          <span> {article.userTable.name.toUpperCase()} </span>
        </div>

        <div className="img-container read">
          <Image src={imagePath} height={256} width={1000} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: marked(article.markdown) }} />
      </div>
    </>
  );
}
