import { useState } from 'react';
import Cookies from 'universal-cookie';
import ArticleCards from './ArticleCards';

export default function ArticleGrid({ data }) {
  const [allArticleData, setAllArticleData] = useState(data);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteArticle = async (id, title) => {
    const cookies = new Cookies();
    const token = cookies.get('jwtToken');
    const res = await fetch(`https://mixd-blog.herokuapp.com/api/posts/${id}`, {
      headers: {
        Authorization: token,
      },
      method: 'DELETE',
    });
    setAllArticleData(allArticleData.filter((article) => article.id !== id));
    setErrorMessage(`Article ${title} deleted successfully `);
  };

  return (
    <>
      <div className="alert alert-error  " role="alert">
        {errorMessage}
      </div>
      <div className="card-article">
        {allArticleData.map((article) => (
          <ArticleCards key={article.id} article={article} handleDelete={handleDeleteArticle} />
        ))}
      </div>
    </>
  );
}
