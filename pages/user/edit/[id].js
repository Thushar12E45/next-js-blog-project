import router from 'next/router';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { getAllArticlesId, getArticleById } from '../../../lib/fetchData';
import Header from '../../../components/Header';
import ArticleInputForm from '../../../components/ArticleInputForm';

export default function EditArticle({ article }) {
  const editTheArticle = async (event) => {
    event.preventDefault();

    const cookies = new Cookies();
    const token = cookies.get('jwtToken');
    const file = event.target.img.files[0];

    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('markdown', event.target.markdown.value);
    if (file) {
      formData.append('img', file);
    }
    const submittedData = await fetch(`https://mixd-blog.herokuapp.com/api/posts/${article.id}`, {
      body: formData,
      headers: {
        Authorization: token,
      },
      method: 'PUT',
    });
    const editedArticle = await submittedData.json();
    router.push(`/posts/${editedArticle.id}`);
    toast.success(`Article ${editedArticle.title} updated successfully`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
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
            <Link href="/">
              <a className="abutton grey">Cancel</a>
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
