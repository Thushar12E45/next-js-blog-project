import { useRouter } from 'next/router';
import styles from './ArticleInputForm.module.css';

export default function ArticleInputForm({ article }) {
  const Router = useRouter();
  const checkLocation = Router.pathname === '/user/edit/[id]';
  return (
    <>
      <div>
        <input
          required
          type="text"
          name="title"
          id="title"
          className={`${styles.inputForm}`}
          placeholder="Enter your title here"
          defaultValue={checkLocation ? article.title : ''}
        />
      </div>
      <div>
        <label htmlFor="img" className={`${styles.imgUpload}`}>
          {checkLocation ? 'Update ' : 'Upload '}
          image :
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            className={`${styles.imgUpload}`}
            required={!checkLocation}
          />
        </label>
      </div>
      <div>
        <textarea
          required
          type="text"
          name="markdown"
          id="markdown"
          className={`${styles.inputForm} ${styles.markdown}`}
          placeholder="Write your article( in markdown )"
          defaultValue={checkLocation ? article.markdown : ''}
        />
      </div>
    </>
  );
}
