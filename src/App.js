import './App.css';
import { useState } from 'react';
import * as React from 'react';
import { Gallery } from './components/Gallery'
import { SearchForm } from './components/SearchForm';

const App = () => {
  const CLIENT_ID = '03e23814bc615ef';
  const [searchParam, setSearchParam] = useState('time');
  const API_ENDPOINT = (`https://api.imgur.com/3/gallery/search/${searchParam}?q=`);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [images, setImages] = useState({});

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        Accept: 'image/jpeg',
      }
    }

    const fetchImageAPI = async () => {
      const data = await fetch(url, config)
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
  }
  return (
    <div className="App">
      <h1>imgur search engine</h1>
      <SearchForm onSearchSubmit={handleSubmit} onSearchChange={handleChange} onSearchParamChange={handleSearchParam}></SearchForm>
      <Gallery gallery={images ? images : []} />
    </div>
  );
}

export default App;