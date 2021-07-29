import { useRouter } from 'next/router';

export default function ArticleInputForm({ article }) {
  const Router = useRouter();
  const checkLocation = Router.pathname === '/user/edit/[id]';
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
          defaultValue={checkLocation ? article.title : ''}
        />
      </div>
      <div>
        <label htmlFor="img" className="img-upload">
          {checkLocation ? 'Update ' : 'Upload '}
          image :
          <input type="file" id="img" name="img" accept="image/*" className="img-upload" required={!checkLocation} />
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
          defaultValue={checkLocation ? article.markdown : ''}
        />
      </div>
    </>
  );
}
