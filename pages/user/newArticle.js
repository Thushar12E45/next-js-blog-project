import { Tokenizer } from 'marked';
import Link from 'next/link';
import router from 'next/router';
import Cookies from 'universal-cookie';
import ArticleInputForm from '../../components/ArticleInputForm';
import Header from '../../components/Header';

export default function NewArticle() {
  const addNewArticle = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get('jwtToken');
    const submittedData = await fetch('https://mixd-blog.herokuapp.com/api/posts', {
      body: JSON.stringify({
        authorId: cookies.get('userId'),
        title: event.target.title.value,
        markdown: event.target.markdown.value,
      }),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const newArticle = await submittedData.json();
    const file = event.target.img.files[0];
    const filename = `${newArticle.id}`;

    router.push(`/posts/${newArticle.id}`);
  };

  return (
    <>
      <Header />
      <div className="new-article">
        <h2> New Article</h2>
        <form onSubmit={addNewArticle}>
          <ArticleInputForm />
          <div className="center">
            <button type="submit" className="btn black ">
              Publish
            </button>
            <Link href="/user/" className="abutton grey">
              <a>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
