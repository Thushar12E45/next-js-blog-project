import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import Date from './date';

export default function ArticleCards({ article, handleDelete, errorMessage }) {
  const editArticle = (e) => {
    e.preventDefault();
    router.push(`/user/edit/${article.id}`);
  };

  const deleteArticle = async (e) => {
    e.preventDefault();
    handleDelete(article.id, article.title);
  };

  const imagePath = `https://mixd-blog.herokuapp.com/images/${article.id}.jpeg`;
  return (
    <div className="article-section">
      <div>
        <div className="img-container">
          <Image src={imagePath} height={256} width={300} layout="intrinsic" />
        </div>

        <h3>
          {' '}
          <Link href={`/posts/${article.id}`}>
            <a>{article.title} </a>
          </Link>
        </h3>
      </div>
      <div>
        <span>
          <Date dateString={article.date} />
        </span>
        &nbsp;|&nbsp;
        <span> {article.userTable.name} </span>
        {localStorage.getItem('isLogged') === 'true' ? (
          <div>
            <button className="span-btn" type="button" name="edit" onClick={(e) => editArticle(e)}>
              <span> Edit </span>
            </button>
            |
            <button className="span-btn" type="button" name="delete" onClick={(e) => deleteArticle(e)}>
              <span> Delete </span>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
