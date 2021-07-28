import { useRouter } from 'next/router';

export default function ArticleInputForm({ article }) {
  const Router = useRouter();

  return (
    <>
      <div className="form-group ">
        <input
          required
          type="text"
          name="title"
          id="title"
          className="input-form"
          placeholder="Enter your title here"
          defaultValue={Router.pathname === '/user/edit/[id]' ? article.title : ''}
        />
      </div>
      <div>
        <label htmlFor="img" className="img-upload">
          {Router.pathname === '/user/edit/[id]' ? 'Update ' : 'Upload '}
          image :
          <input type="file" id="img" name="img" accept="image/*" className="img-upload" />
        </label>
      </div>
      <div className="form-group">
        <textarea
          required
          type="text"
          name="markdown"
          id="markdown"
          className="input-form markdown "
          placeholder="Write your article( in markdown )"
          defaultValue={Router.pathname === '/user/edit/[id]' ? article.markdown : ''}
        />
      </div>
    </>
  );
}
