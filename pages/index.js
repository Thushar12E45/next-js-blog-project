import useSWR from 'swr';
import { useState } from 'react';
import Header from '../components/MainHeader';
import ArticleGrid from '../components/ArticleGrid';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [url, setUrl] = useState('https://mixd-blog.herokuapp.com/api/posts');
  const { data, error } = useSWR(url);

  const [searchData, setSearchData] = useState({
    keyword: '',
    author: '',
    sortType: '',
  });

  const handleSearch = ({ author, keyword, sortType }) => {
    setSearchData({ keyword, author, sortType });

    setUrl(`https://mixd-blog.herokuapp.com/api/search?keyword=${keyword}&author=${author}&sortType=${sortType}`);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header setUrl={setUrl} />
      <SearchBar searchData={searchData} handleSearch={handleSearch} />
      {data.length ? <ArticleGrid data={data} /> : <h3>Article not found</h3>}
    </>
  );
}
