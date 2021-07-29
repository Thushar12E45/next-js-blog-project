import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import useSWR from 'swr';

export default function SearchBar({ searchData, handleSearch }) {
  const [keyword, setKeyword] = useState(() => searchData.keyword);
  const [author, setAuthor] = useState(() => searchData.author);
  const [sortType, setSortType] = useState(() => searchData.sortType);

  const url = 'https://mixd-blog.herokuapp.com/api/authorList';

  const { data, error } = useSWR(url);

  if (error) return <div>Failed to fetch author list</div>;
  if (!data) return <div> </div>;

  console.log(data);
  const handleSearchClick = async (event) => {
    event.preventDefault();
    handleSearch({
      keyword,
      author,
      sortType,
    });
  };

  return (
    <form onSubmit={(e) => handleSearchClick(e)}>
      <div className=" search ">
        <input
          type="text"
          name="keyword"
          id="keyword"
          className="search-input"
          placeholder="Search by keyword"
          defaultValue={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />

        <button type="submit" className="search-icon">
          <span>
            <FaSearch />
          </span>
        </button>

        <select
          id="author"
          name="author"
          className="search-input"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option>Search by author</option>
          {data.map((authorData) => (
            <option key={authorData.id} defaultValue={authorData.name}>
              {authorData.name}
            </option>
          ))}
        </select>

        <div className="sort">
          <label htmlFor="sortType">
            Sort by:
            <input
              type="radio"
              name="sortType"
              value="desc"
              defaultChecked={searchData.sortType === 'desc'}
              onClick={() => setSortType('desc')}
            />{' '}
            Latest
            <input
              type="radio"
              name="sortType"
              value="asc"
              defaultChecked={searchData.sortType === 'asc'}
              onClick={() => setSortType('asc')}
            />{' '}
            Oldest
          </label>
        </div>

        <button type="submit" className="search-button">
          Go
        </button>
      </div>
    </form>
  );
}
