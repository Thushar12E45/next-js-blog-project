import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export default function SearchBar({ searchData, handleSearch }) {
  const [keyword, setKeyword] = useState(() => searchData.keyword);
  const [author, setAuthor] = useState(() => searchData.author);
  const [sortType, setSortType] = useState(() => searchData.sortType);

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

        <input
          type="text"
          name="author"
          id="author"
          className="search-input"
          placeholder="Search by author"
          defaultValue={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />

        <button type="submit" className="search-icon">
          <span>
            <FaSearch />
          </span>
        </button>

        <div className="sort">
          <label htmlFor="sortType">
            Sort by:
            <input
              type="radio"
              name="sortType"
              value="desc"
              defaultChecked={searchData.sortType === 'desc'}
              onChange={() => setSortType('desc')}
            />{' '}
            Latest
            <input
              type="radio"
              name="sortType"
              value="asc"
              defaultChecked={searchData.sortType === 'asc'}
              onChange={() => setSortType('asc')}
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
