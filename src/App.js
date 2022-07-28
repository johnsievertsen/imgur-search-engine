import './App.css';
import { useState } from 'react';
import * as React from 'react';
import { Gallery } from './components/Gallery'
import { SearchForm } from './components/SearchForm';
import { SortSelector } from './components/SortSelector';

const App = () => {
  const CLIENT_ID = '03e23814bc615ef';
  const [searchParam, setSearchParam] = useState('time');
  const [currentPage, setCurrentPage] = useState(1)
  const API_ENDPOINT = (`https://api.imgur.com/3/gallery/search/${searchParam}/${currentPage}?q=`);
  if (!localStorage.getItem('searchTerm')) { localStorage.setItem('searchTerm', ''); }
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm'));
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [images, setImages] = useState({});
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      }
    }

    const fetchImageAPI = async () => {
      await fetch(url, config)
        .then((data) => data.json())
        .then((result) => setImages(result.data));
    }
    fetchImageAPI();
  }, [url]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleSubmit(e) {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    e.preventDefault();
  }

  function handleSearchParam(e) {
    setSearchParam(e.target.value);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
    localStorage.setItem('searchTerm', e.target.value);
  }

  function handleChangePage(e) {
    if (currentPage < 1) {
      setCurrentPage(1);
      setUrl(`${API_ENDPOINT}${searchTerm}`);
      return;
    }
    setCurrentPage(e.target.innerHTML);
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }

  return (
    <div className="App">
      <h1 className="title">imgur search engine</h1>
      <SearchForm
        onSearchSubmit={handleSubmit}
        onSearchChange={handleChange}
      />
      <SortSelector
        currentPage={currentPage}
        onChangePage={handleChangePage}
        onSearchParamChange={handleSearchParam}
      />
      <Gallery gallery={images ? images : []} />
      {images[0] ? <SortSelector
        onSearchParamChange={handleSearchParam}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      /> : <br />}
    </div>
  );
}

export default App;