import Image from 'next/image';
import router from 'next/router';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { getAllArticlesId, getArticleById } from '../../../lib/fetchData';
import Header from '../../../components/Header';
import ArticleInputForm from '../../../components/ArticleInputForm';

export default function EditArticle({ article }) {
  const editTheArticle = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get('jwtToken');
    const submittedData = await fetch(`https://mixd-blog.herokuapp.com/api/posts/${article.id}`, {
      body: JSON.stringify({
        title: event.target.title.value,
        markdown: event.target.markdown.value,
      }),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const editedArticle = await submittedData.json();
    router.push(`/posts/${editedArticle.id}`);
  };
  return (
    <>
      <Header />
      <div className="new-article">
        <h2> New Article</h2>
        <form onSubmit={editTheArticle}>
          <ArticleInputForm article={article} />
          <div className="center">
            <button type="submit" className="btn black ">
              Update
            </button>
            <Link href="/" className="abutton grey">
              <a>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllArticlesId();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const article = await getArticleById(params.id);
  return {
    props: {
      article,
    },
  };
}
