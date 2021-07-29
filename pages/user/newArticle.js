import Link from 'next/link';
import router from 'next/router';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import ArticleInputForm from '../../components/ArticleInputForm';
import Header from '../../components/Header';

export default function NewArticle() {
  const addNewArticle = async (event) => {
    event.preventDefault();

    const cookies = new Cookies();
    const token = cookies.get('jwtToken');
    const file = event.target.img.files[0];

    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('markdown', event.target.markdown.value);
    formData.append('authorId', cookies.get('userId'));
    formData.append('img', file);
    const submittedData = await fetch('https://mixd-blog.herokuapp.com/api/posts', {
      body: formData,
      headers: {
        Authorization: token,
      },
      method: 'POST',
    });
    const newArticle = await submittedData.json();
    toast.success(`New article ${newArticle.title} created successfully`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
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
            <Link href="/">
              <a className="abutton grey">Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
