import { mutate } from 'swr';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import ArticleCards from './ArticleCards';

export default function ArticleGrid({ data }) {
  const handleDeleteArticle = async (id, title) => {
    const cookies = new Cookies();
    const token = cookies.get('jwtToken');

    const res = await fetch(`https://mixd-blog.herokuapp.com/api/posts/${id}`, {
      headers: {
        Authorization: token,
      },
      method: 'DELETE',
    });
    if (res.status === 200) {
      mutate('https://mixd-blog.herokuapp.com/api/posts');
      toast.error(`Article ${title} deleted successfully `, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 });
    }
  };

  return (
    <>
      <div className="card-article">
        {data.map((article) => (
          <ArticleCards key={article.id} article={article} handleDelete={handleDeleteArticle} />
        ))}
      </div>
    </>
  );
}
